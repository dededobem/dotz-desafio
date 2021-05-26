using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dotz.Application.Interfaces.Base
{
    public interface IApplication<T> where T : class
    {
        Task<T> Add(T entity);
        Task<IEnumerable<T>> GetAll();        
    }
}
