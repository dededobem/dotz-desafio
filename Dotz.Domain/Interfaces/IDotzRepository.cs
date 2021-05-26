using Dotz.Domain.Entities;
using Dotz.Domain.Interfaces.Base;
using System.Threading.Tasks;

namespace Dotz.Domain.Interfaces
{
    public interface IDotzRepository : IRepository<Dz>
    {
        Task<Dz> GetByCustomer(string id);

    }
}
