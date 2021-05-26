FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Dotz.Api/Dotz.Api.csproj", "Dotz.Api/"]
RUN dotnet restore "Dotz.Api/Dotz.Api.csproj"
COPY . .
WORKDIR "/src/Dotz.Api"
RUN dotnet build "Dotz.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Dotz.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Dotz.Api.dll"]
