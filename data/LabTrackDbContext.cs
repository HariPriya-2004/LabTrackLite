using Microsoft.EntityFrameworkCore;


namespace LabTrackLite
{
    public class LabTrackDbContext : DbContext
    {
        public LabTrackDbContext(DbContextOptions<LabTrackDbContext> options)
            : base(options) { }

        public DbSet<Asset> Assets { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
    }
}
