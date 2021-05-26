using Dotz.Domain.Enums;
using System;

namespace Dotz.Domain.Entities
{
    public class Transaction : EntityBase
    {
        public Transaction(Guid id, string customerId, OperationType type,
            string localType, string details, double dz) : base(id)
        {
            CustomerId = customerId;
            OperationDate = DateTime.Now;
            OperationType = type;
            LocalType = localType;
            Details = details;
            Dz = CalculateByOperation(dz);
        }

        protected Transaction() { }

        public string CustomerId { get; private set; }
        public DateTime OperationDate { get; private set; }
        public OperationType OperationType { get; private set; }
        public string LocalType { get; private set; }
        public string Details { get; private set; }
        public double Dz { get; private set; }

        public double CalculateByOperation(double dz) =>        
            OperationType == OperationType.CREDITO ? dz : dz * -1;

    }
}
