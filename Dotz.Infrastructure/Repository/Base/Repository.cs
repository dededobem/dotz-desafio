using Dotz.Domain.Entities;
using Dotz.Domain.Interfaces.Base;
using Dotz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dotz.Infrastructure.Repository.Base
{
    public class Repository<T> : IRepository<T> where T : EntityBase
    {
        private readonly DotzDbContext _context;
        private readonly DbSet<T> _dbSet;
        public Repository(DotzDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();            
        }

        public async Task<IEnumerable<T>> GetAll() => await _dbSet.ToListAsync();

        public async Task<T> GetById(Guid id) => 
            await _dbSet.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);        

        public async Task Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
