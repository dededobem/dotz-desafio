using Dotz.Application.Interfaces.Base;
using Dotz.Application.ViewModels;
using System.Threading.Tasks;

namespace Dotz.Application.Interfaces
{
    public interface IAppDotz : IApplication<DotzViewModel>
    {
        Task<DotzViewModel> GetByCustomer(string id);
        Task<DotzViewModel> Update(string customerId, double valueDz);
        
    }
}
