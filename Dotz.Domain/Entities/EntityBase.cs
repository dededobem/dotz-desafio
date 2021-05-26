using System;

namespace Dotz.Domain.Entities
{
    public abstract class EntityBase
    {
        public EntityBase(Guid id) => Id = id;
        protected EntityBase() { }

        public Guid Id { get; private set; }       
                
    }
}
