using Dotz.Domain.Entities;
using Dotz.Domain.Interfaces;
using Dotz.Infrastructure.Data;
using Dotz.Infrastructure.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Dotz.Infrastructure.Repository
{
    public class DotzRepository : Repository<Dz>, IDotzRepository
    {
        private readonly DotzDbContext _dbContext;

        public DotzRepository(DotzDbContext dbContext) : base(dbContext) => _dbContext = dbContext;

        public async Task<Dz> GetByCustomer(string id) =>
            await _dbContext.Dotz.AsNoTracking().FirstOrDefaultAsync(x => x.CustomerId == id);
        
    }
}
