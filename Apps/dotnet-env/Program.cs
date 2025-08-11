using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () =>
{
    var html = "<h1>Environment Variables</h1><ul>";
    foreach (var kv in Environment.GetEnvironmentVariables().Keys)
    {
        html += $"<li><b>{kv}</b>: {Environment.GetEnvironmentVariable(kv.ToString() ?? "")}</li>";
    }
    html += "</ul>";
    return Results.Content(html, "text/html");
});

app.Run();
