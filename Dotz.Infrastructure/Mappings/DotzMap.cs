using Dotz.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dotz.Infrastructure.Mappings
{
    public class DotzMap : IEntityTypeConfiguration<Dz>
    {
        public void Configure(EntityTypeBuilder<Dz> builder)
        {
            builder.Property(c => c.Id)
                .HasColumnName("Id");
            
        }
    }
}
