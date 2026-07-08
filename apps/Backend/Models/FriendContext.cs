using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class FriendContext : DbContext
{
    public FriendContext(DbContextOptions<FriendContext> options)
        : base(options)
    {
    }

    public DbSet<Friend> Friends { get; set; } = null!;
}