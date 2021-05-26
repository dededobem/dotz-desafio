using Dotz.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dotz.Domain.Interfaces.Base
{
    public interface IRepository<T> where T : EntityBase
    {
        Task Add(T entity);
        Task Update(T entity);
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(Guid id);
    }
}
