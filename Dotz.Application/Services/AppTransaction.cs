using Dotz.Application.Interfaces;
using Dotz.Application.ViewModels;
using Dotz.Domain.Entities;
using Dotz.Domain.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dotz.Application.Services
{
    public class AppTransaction : IAppTransaction
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IDotzRepository _dotzRepository;

        public AppTransaction(ITransactionRepository transactionRepository, IDotzRepository dotzRepository)
        {
            _transactionRepository = transactionRepository;
            _dotzRepository = dotzRepository;
        }

        public async Task<TransactionViewModel> Add(TransactionViewModel transaction)
        {
            var transactionDz = new Transaction(
                    transaction.Id,
                    transaction.CustomerId,
                    transaction.OperationType,
                    transaction.LocalType,
                    transaction.Details,
                    transaction.Dz);
            await _transactionRepository.Add(transactionDz);
            await CalculateBalanceDz(transactionDz.CustomerId, transactionDz.Dz);
            return new TransactionViewModel(transactionDz);
        }

        public async Task<IEnumerable<TransactionViewModel>> GetAll() =>
            (await _transactionRepository.GetAll()).Select(x => new TransactionViewModel(x));

        public async Task<IEnumerable<TransactionViewModel>> GetByCustomer(string id) =>        
            (await _transactionRepository.GetByCustomer(id)).Select(x => new TransactionViewModel(x));        

        public async Task CalculateBalanceDz(string customerId, double dz)
        {
            var dzBalance = await _dotzRepository.GetByCustomer(customerId);
            dzBalance.UpdateCurrentBalance(dz);
            await _dotzRepository.Update(dzBalance);
        }
            
    }
}
