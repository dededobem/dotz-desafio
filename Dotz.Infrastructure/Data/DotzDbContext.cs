using Dotz.Domain.Entities;
using Dotz.Infrastructure.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Dotz.Infrastructure.Data
{
    public class DotzDbContext : DbContext
    {
        public DotzDbContext(DbContextOptions<DotzDbContext> options) : base(options) { }

        public DbSet<Dz> Dotz { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new DotzMap());
            modelBuilder.ApplyConfiguration(new TransactionMap());
        }
    }
}
