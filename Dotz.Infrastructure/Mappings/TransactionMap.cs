using Dotz.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dotz.Infrastructure.Mappings
{
    public class TransactionMap : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.Property(c => c.Id)
                .HasColumnName("Id");

            builder.Property(c => c.LocalType)
                .HasColumnType("varchar")
                .HasMaxLength(100);

            builder.Property(c => c.Details)
                .HasColumnType("varchar")
                .HasMaxLength(500);

        }
    }
}
