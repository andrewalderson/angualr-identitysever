FROM microsoft/aspnetcore:1.1 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:1.1 AS build
WORKDIR /src
COPY ["src/IdentityServer/IdentityServer.csproj", "src/IdentityServer/"]
RUN dotnet restore "src/IdentityServer/IdentityServer.csproj"
COPY . .
WORKDIR "/src/src/IdentityServer"
RUN dotnet build "IdentityServer.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "IdentityServer.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "OidcDemo.Services.Identity.dll"]
