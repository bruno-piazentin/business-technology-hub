# Build: SDK do .NET 10 (LTS)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY HubApi/HubApi.csproj HubApi/
RUN dotnet restore HubApi/HubApi.csproj
COPY HubApi/ HubApi/
RUN dotnet publish HubApi/HubApi.csproj -c Release -o /app --no-restore

# Runtime: ASP.NET Core 10 (mesma versão principal do SDK)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "HubApi.dll"]
