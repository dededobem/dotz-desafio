using Dotz.Api.Models;
using Dotz.Application.Interfaces;
using Dotz.Application.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Dotz.Api.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly IAppTransaction _appTransaction;

        public TransactionController(IAppTransaction appTransaction)
        {
            _appTransaction = appTransaction;
        }

        /// <summary>
        /// Realizar a simulação de uma transação
        /// </summary>
        /// <remarks>
        /// Método para gerar uma nova transação
        /// </remarks>
        /// <param name="transaction">Dados para realizar a transação</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RequestTransaction transaction)
        {
            transaction.CustomerId = User.Claims.Where(x => x.Type == "user_id").FirstOrDefault().Value;
            var transactionVM = new TransactionViewModel(
                transaction.CustomerId, 
                transaction.OperationType,
                transaction.LocalType,
                transaction.Details,
                transaction.Dz
                );
            return Ok(await _appTransaction.Add(transactionVM));
        }

        /// <summary>
        /// Retornar todas as transações de todos os usuários
        /// </summary>
        /// <remarks>
        /// Método para retornar todas as transações
        /// </remarks>
        /// <returns></returns>
        [HttpGet]        
        public async Task<IActionResult> Get() => new OkObjectResult(await _appTransaction.GetAll());

        /// <summary>
        /// Retornar as transações do usuário logado
        /// </summary>
        /// <remarks>
        /// Método para retornar as transações do cliente através do seu id retornado do firebase
        /// </remarks>
        /// <returns></returns>
        [HttpGet("get-by-customer")]
        public async Task<IActionResult> GetByCustomer()
        {
            var customerId = User.Claims.Where(x => x.Type == "user_id").FirstOrDefault().Value;
            return new OkObjectResult(await _appTransaction.GetByCustomer(customerId));
        }
    }
}
