using Dotz.Domain.Entities;
using System;

namespace Dotz.Application.ViewModels
{
    public class DotzViewModel
    {
        public DotzViewModel(Dz dotz, double aliquotDz)
        {
            Id = dotz.Id;
            CustomerId = dotz.CustomerId;
            CurrentBalance = dotz.CurrentBalance;
            CurrentBalanceReal = dotz.GetCurrentBalanceReal(aliquotDz);
            UpdateAt = dotz.UpdateAt;
        }

        public Guid Id { get; set; }
        public string CustomerId { get; set; }
        public double CurrentBalance { get; set; }
        public double CurrentBalanceReal { get; set; }
        public DateTime UpdateAt { get; set; }
        
    }
}
