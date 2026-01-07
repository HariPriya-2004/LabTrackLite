using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());


// ---------------- DATA (In-Memory) ----------------
var assets = new List<Asset>();
var tickets = new List<Ticket>();

// ---------------- ASSET APIs ----------------
app.MapGet("/assets", () => Results.Ok(assets));

app.MapPost("/assets", (Asset asset) =>
{
    assets.Add(asset);
    return Results.Ok("Asset added successfully");
});

// ---------------- TICKET APIs ----------------
app.MapGet("/tickets", () => Results.Ok(tickets));

app.MapPost("/tickets", (Ticket ticket) =>
{
    tickets.Add(ticket);
    return Results.Ok("Ticket created successfully");
});

// ---------------- CHATBOT (Rule-Based) ----------------
// ---------------- CHATBOT (Rule-Based) ----------------
app.MapPost("/chat", (ChatRequest req) =>
{
    var query = req.Query.ToLower();

    if (query.Contains("asset"))
        return Results.Ok("You can view and manage lab assets.");

    if (query.Contains("ticket"))
        return Results.Ok("You can raise and track tickets.");

    return Results.Ok("Sorry, I did not understand your query.");
});

app.MapGet("/", () => "LabTrackLite API is running");

app.Run();

// ---------------- MODELS (MUST BE AT END IN .NET 10) ----------------
record Asset(int Id, string Name, string Category, string QRCode, string Status);
record Ticket(int Id, int AssetId, string Title, string Status);
record ChatRequest(string Query);

