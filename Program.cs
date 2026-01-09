using Microsoft.EntityFrameworkCore;
using LabTrackLite;

var builder = WebApplication.CreateBuilder(args);

// SQLite DB
builder.Services.AddDbContext<LabTrackDbContext>(options =>
    options.UseSqlite("Data Source=labtrack.db"));

builder.Services.AddCors();

var app = builder.Build();

// Create DB if not exists
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LabTrackDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors(p =>
    p.AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());

// -------- ASSETS --------
app.MapGet("/assets", async (LabTrackDbContext db) =>
    await db.Assets.ToListAsync());

app.MapPost("/assets", async (Asset asset, LabTrackDbContext db) =>
{
    db.Assets.Add(asset);
    await db.SaveChangesAsync();
    return Results.Ok(asset);
});

// -------- TICKETS --------
app.MapGet("/tickets", async (LabTrackDbContext db) =>
    await db.Tickets.ToListAsync());

app.MapPost("/tickets", async (Ticket ticket, LabTrackDbContext db) =>
{
    db.Tickets.Add(ticket);
    await db.SaveChangesAsync();
    return Results.Ok(ticket);
});

// -------- CHATBOT --------
app.MapPost("/chat", (ChatRequest req) =>
{
    var q = req.Query.ToLower();

    if (q.Contains("asset"))
        return Results.Ok("You can view and manage lab assets.");

    if (q.Contains("ticket"))
        return Results.Ok("You can create and track tickets.");

    return Results.Ok("Sorry, I did not understand your query.");
});

app.MapGet("/", () => "LabTrack Lite API running with SQLite");

app.Run();

record ChatRequest(string Query);
