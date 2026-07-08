using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<FriendDb>(options =>
    options.UseInMemoryDatabase("Friends"));
    // options.UseSqlite("Data Source=friends.db"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "FriendAPI";
    config.Title = "FriendAPI v1";
    config.Version = "v1";
});
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "FriendAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/", () => "Hello World!");

// Get all friends
app.MapGet("/friends", async (FriendDb db) =>
    await db.Friends.ToListAsync());

// Get a friend by ID
app.MapGet("/friends/{id}", async (int id, FriendDb db) =>
    await db.Friends.FindAsync(id)
        is Friend friend
            ? Results.Ok(friend)
            : Results.NotFound());

// Create a friend
app.MapPost("/friends", async (Friend friend, FriendDb db) =>
{
    db.Friends.Add(friend);
    await db.SaveChangesAsync();

    return Results.Created($"/friends/{friend.Id}", friend);
});

// Update a friend
app.MapPut("/friends/{id}", async (int id, Friend inputFriend, FriendDb db) =>
{
    var friend = await db.Friends.FindAsync(id);

    if (friend is null) return Results.NotFound();

    friend.Name = inputFriend.Name;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

// Delete a friend
app.MapDelete("/friends/{id}", async (int id, FriendDb db) =>
{
    if (await db.Friends.FindAsync(id) is Friend friend)
    {
        db.Friends.Remove(friend);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
