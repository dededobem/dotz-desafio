using Dotz.Application.Interfaces.Base;
using Dotz.Application.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dotz.Application.Interfaces
{
    public interface IAppTransaction : IApplication<TransactionViewModel>
    {
        Task<IEnumerable<TransactionViewModel>> GetByCustomer(string id);
    }
}
