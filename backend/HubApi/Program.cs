using HubApi;
using Npgsql;

// Desenvolvimento local: carrega variáveis de um arquivo .env (ignorado pelo git), se existir.
DotEnv.Load(Path.Combine(Directory.GetCurrentDirectory(), ".env"));

var builder = WebApplication.CreateBuilder(args);

// Railway (e outras plataformas) informam a porta pela variável PORT.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

// Origens autorizadas a chamar a API (frontend local e Vercel), separadas por vírgula.
var allowedOrigins = (builder.Configuration["CORS_ORIGINS"] ?? "http://localhost:3000")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));

// Conexão com o PostgreSQL (Supabase). Aceita DATABASE_URL (formato URI) ou ConnectionStrings:Default.
var connectionString = DatabaseConfig.Resolve(builder.Configuration);
if (connectionString is not null)
{
    builder.Services.AddSingleton(NpgsqlDataSource.Create(connectionString));
}

var app = builder.Build();
app.UseCors();

app.MapGet("/", () => Results.Redirect("/api/health"));

app.MapGet("/api/health", () => Results.Ok(new
{
    status = "ok",
    service = "business-technology-hub-api",
    runtime = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription,
    environment = app.Environment.EnvironmentName,
    databaseConfigured = connectionString is not null,
    time = DateTimeOffset.UtcNow,
}));

app.MapGet("/api/db-check", async (IServiceProvider services, CancellationToken ct) =>
{
    var dataSource = services.GetService<NpgsqlDataSource>();
    if (dataSource is null)
    {
        return Results.Json(new { status = "not_configured", message = "Defina DATABASE_URL para conectar ao banco." }, statusCode: 503);
    }

    try
    {
        var started = DateTimeOffset.UtcNow;
        await using var conn = await dataSource.OpenConnectionAsync(ct);

        // Prova leitura e escrita: registra um "ping" a cada verificação.
        await using (var create = new NpgsqlCommand(
            "create table if not exists infra_pings (id bigserial primary key, created_at timestamptz not null default now())", conn))
        {
            await create.ExecuteNonQueryAsync(ct);
        }

        await using var cmd = new NpgsqlCommand(
            "insert into infra_pings default values; select version(), now(), (select count(*) from infra_pings)", conn);
        await using var reader = await cmd.ExecuteReaderAsync(ct);
        await reader.ReadAsync(ct);

        return Results.Ok(new
        {
            status = "ok",
            database = reader.GetString(0).Split(',')[0],
            serverTime = reader.GetDateTime(1),
            pings = reader.GetInt64(2),
            latencyMs = (int)(DateTimeOffset.UtcNow - started).TotalMilliseconds,
        });
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Falha ao conectar ao banco");
        return Results.Json(new { status = "error", message = ex.Message }, statusCode: 503);
    }
});

app.Run();
