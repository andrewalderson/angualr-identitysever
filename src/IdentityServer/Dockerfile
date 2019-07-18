FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -yq nodejs build-essential
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
