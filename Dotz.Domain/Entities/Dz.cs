using System;

namespace Dotz.Domain.Entities
{
    public class Dz : EntityBase
    {   
        public Dz(Guid id, string customerId, double currentBalance) : base(id)
        {            
            CustomerId = customerId;
            CurrentBalance = currentBalance;
            UpdateAt = DateTime.Now;
        }

        protected Dz() { }

        public string CustomerId { get; private set; }
        public double CurrentBalance { get; private set; }
        public DateTime UpdateAt { get; private set; }

        public double GetCurrentBalanceReal(double aliquotDz) => CurrentBalance * aliquotDz;

        public void UpdateCurrentBalance(double value) => CurrentBalance += value;
    }
}
