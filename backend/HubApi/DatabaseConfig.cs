using Npgsql;

namespace HubApi;

public static class DatabaseConfig
{
    /// <summary>
    /// Lê a conexão do banco. Prioriza DATABASE_URL no formato URI
    /// (postgresql://usuario:senha@host:5432/postgres, como o Supabase fornece)
    /// e, se não houver, usa ConnectionStrings:Default no formato do Npgsql.
    /// </summary>
    public static string? Resolve(IConfiguration configuration)
    {
        var url = configuration["DATABASE_URL"];
        if (!string.IsNullOrWhiteSpace(url))
        {
            return FromUri(url);
        }

        var cs = configuration.GetConnectionString("Default");
        return string.IsNullOrWhiteSpace(cs) ? null : cs;
    }

    public static string FromUri(string url)
    {
        var uri = new Uri(url);
        var userInfo = uri.UserInfo.Split(':', 2);

        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port > 0 ? uri.Port : 5432,
            Username = Uri.UnescapeDataString(userInfo[0]),
            Password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : null,
            Database = uri.AbsolutePath.Trim('/') is { Length: > 0 } db ? db : "postgres",
            SslMode = SslMode.Require,
            // Compatível com o pooler do Supabase (Supavisor) em modo transação.
            NoResetOnClose = true,
        };

        return builder.ConnectionString;
    }
}
