using Microsoft.EntityFrameworkCore;

class FriendDb : DbContext
{
    public FriendDb(DbContextOptions<FriendDb> options)
        : base(options) { }

    public DbSet<Friend> Friends => Set<Friend>();
}