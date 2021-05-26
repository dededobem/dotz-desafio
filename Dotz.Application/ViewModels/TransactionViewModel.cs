using Dotz.Domain.Entities;
using Dotz.Domain.Enums;
using System;

namespace Dotz.Application.ViewModels
{
    public class TransactionViewModel
    {
        public TransactionViewModel() { }

        public TransactionViewModel(Transaction transaction)
        {
            Id = transaction.Id;
            CustomerId = transaction.CustomerId;
            OperationDate = transaction.OperationDate;
            OperationType = transaction.OperationType;
            LocalType = transaction.LocalType;
            Details = transaction.Details;
            Dz = transaction.Dz;
        }
        public TransactionViewModel(string customerId, OperationType operationType, 
            string localType, string details, double dz)
        {
            CustomerId = customerId;
            OperationType = operationType;
            LocalType = localType;
            Details = details;
            Dz = dz;
        }

        public Guid Id { get; set; }
        public string CustomerId { get; set; }        
        public DateTime OperationDate { get; set; }
        public OperationType OperationType { get; set; }
        public string LocalType { get; set; }
        public string Details { get; set; }
        public double Dz { get; set; }
    }
}
