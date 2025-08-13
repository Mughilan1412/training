using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// appsettings.json is loaded by default, and Docker env vars automatically override matching keys
var configuration = builder.Configuration;

var app = builder.Build();

app.MapGet("/", () =>
{
    // Read values from configuration (env vars override appsettings.json)
    var environment = configuration["Environment"];
    var connectionString = configuration["Database:ConnectionString"];

    var html = "<h1>Configured Environment Variables</h1><ul>";
    html += $"<li><b>Environment</b>: {environment}</li>";
    html += $"<li><b>Database:ConnectionString</b>: {connectionString}</li>";
    html += "</ul>";

    return Results.Content(html, "text/html");
});

app.Run();
