using Dotz.Api.Models;
using Dotz.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Dotz.Api.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class DotzController : ControllerBase
    {
        private readonly IAppDotz _appDotz;

        public DotzController(IAppDotz appDotz) =>
            _appDotz = appDotz;

        /// <summary>
        /// Retornar o valor do dotz de todos os usuários
        /// </summary>
        /// <remarks>
        /// Método para retornar valor dos dotz
        /// </remarks>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get() => new OkObjectResult(await _appDotz.GetAll());

        /// <summary>
        /// Atualizar ou inserir valor do dotz
        /// </summary>
        /// <remarks>
        /// Método para configurar um valor para o dotz
        /// </remarks>
        /// <param name="dotz">Valor do dotz</param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> Update(RequestDotz dotz)
        {            
            var _customerId = User.Claims.Where(x => x.Type == "user_id").FirstOrDefault().Value;
            return Ok(await _appDotz.Update(_customerId, dotz.Value));
        }

        /// <summary>
        /// Retornar dotz do usuário logado
        /// </summary>
        /// <remarks>
        /// Método para retornar o dotz através do id do usuário retornado do firebase
        /// </remarks>
        /// <returns></returns>
        [HttpGet("get-by-customer")]
        public async Task<IActionResult> GetByCustomer()
        {   
            var _customerId = User.Claims.Where(x => x.Type == "user_id").FirstOrDefault().Value;
            return Ok(await _appDotz.GetByCustomer(_customerId));
        }
    }
}
