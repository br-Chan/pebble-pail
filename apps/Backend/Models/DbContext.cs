using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public class PebbleContext : DbContext
{
    public DbSet<Friend> Friends { get; set; } = null!;

    public PebbleContext(DbContextOptions<PebbleContext> options)
        : base(options)
    {
    }
}