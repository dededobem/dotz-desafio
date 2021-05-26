using Dotz.Application.Interfaces;
using Dotz.Domain.Configurations;
using Microsoft.Extensions.Options;

namespace Dotz.Application.Services
{
    public class AppConversion : IAppConversion
    {
        private readonly IOptions<DomainConfiguration> _config;

        public AppConversion(IOptions<DomainConfiguration> config)
        {
            _config = config;
        }

        public double ConvertDzToReal(double value) => value * _config.Value.DZ_AMOUNT_IN_REAL;

        public double ConvertRealToDz(double value) => value / _config.Value.DZ_AMOUNT_IN_REAL;
    }
}
