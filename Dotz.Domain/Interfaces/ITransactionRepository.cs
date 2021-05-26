using Dotz.Domain.Entities;
using Dotz.Domain.Interfaces.Base;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dotz.Domain.Interfaces
{
    public interface ITransactionRepository : IRepository<Transaction>
    {
        Task<IEnumerable<Transaction>> GetByCustomer(string id);
    }
}
