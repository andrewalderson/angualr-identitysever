FROM microsoft/aspnetcore:1.1 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:1.1 AS build
WORKDIR /src
COPY ["src/AngularClient/AngularClient.csproj", "src/AngularClient/"]
RUN dotnet restore "src/AngularClient/AngularClient.csproj"
COPY . .
WORKDIR "/src/src/AngularClient"
RUN dotnet build "AngularClient.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "AngularClient.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "OidcDemo.Web.AngularClient.dll"]
