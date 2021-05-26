using Dotz.Api.Models;
using Dotz.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dotz.Api.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class ConversionController : ControllerBase
    {
        private readonly IAppConversion _appConversion;

        public ConversionController(IAppConversion appConversion) =>
            _appConversion = appConversion;

        /// <summary>
        /// Converter dotz em real
        /// </summary>
        /// <remarks>
        /// Método para converter dotz em real
        /// </remarks>
        /// <param name="request">Valor em dotz</param>
        /// <returns></returns>
        [HttpGet("dz-to-real")]
        public IActionResult ConvertDzToReal(RequestDotz request) => 
            new OkObjectResult(_appConversion.ConvertDzToReal(request.Value));

        /// <summary>
        /// Converter real em dotz
        /// </summary>
        /// <remarks>
        /// Método para converter real em dotz
        /// </remarks>
        /// <param name="request">Valor em real</param>
        /// <returns></returns>
        [HttpGet("real-to-dz")]
        public IActionResult ConvertRealToDz(RequestDotz request) =>
            new OkObjectResult(_appConversion.ConvertRealToDz(request.Value));

    }
}
