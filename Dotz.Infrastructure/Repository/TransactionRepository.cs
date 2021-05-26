using Dotz.Domain.Entities;
using Dotz.Domain.Interfaces;
using Dotz.Infrastructure.Data;
using Dotz.Infrastructure.Repository.Base;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dotz.Infrastructure.Repository
{
    public class TransactionRepository : Repository<Transaction>, ITransactionRepository
    {
        private readonly DotzDbContext _dbContext;

        public TransactionRepository(DotzDbContext dbContext) : base(dbContext) => _dbContext = dbContext;

        public async Task<IEnumerable<Transaction>> GetByCustomer(string id) => 
            await _dbContext.Transactions.Where(x => x.CustomerId == id).ToListAsync();         
    }
}
