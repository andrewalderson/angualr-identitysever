FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -yq nodejs build-essential
WORKDIR /src
COPY . .
WORKDIR "/src/src/AngularClient"
RUN dotnet build "AngularClient.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish --no-build "AngularClient.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "OidcDemo.Web.AngularClient.dll"]
