using Dotz.Application.Interfaces;
using Dotz.Application.ViewModels;
using Dotz.Domain.Configurations;
using Dotz.Domain.Entities;
using Dotz.Domain.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dotz.Application.Services
{
    public class AppDotz : IAppDotz
    {
        private readonly IDotzRepository _dotzRepository;
        private readonly IOptions<DomainConfiguration> _config;

        public AppDotz(IDotzRepository dotzRepository, IOptions<DomainConfiguration> config)
        {
            _dotzRepository = dotzRepository;
            _config = config;
        }

        public async Task<DotzViewModel> Add(DotzViewModel dotz)
        {            
            await _dotzRepository.Add(new Dz(dotz.Id, dotz.CustomerId, dotz.CurrentBalance));
            return dotz;
        }

        public async Task<IEnumerable<DotzViewModel>> GetAll() => 
            (await _dotzRepository.GetAll()).Select(x => new DotzViewModel(x, _config.Value.DZ_AMOUNT_IN_REAL));

        public async Task<DotzViewModel> GetByCustomer(string customerId)
        {
            var dotz = await _dotzRepository.GetByCustomer(customerId);            
            if (dotz == null)
            {
                dotz = new Dz(Guid.NewGuid(), customerId, 0);
                await _dotzRepository.Add(dotz);
            }
            return new DotzViewModel(dotz, _config.Value.DZ_AMOUNT_IN_REAL);
        }

        public async Task<DotzViewModel> Update(string customerId, double valueDz)
        {
            var dotz = await _dotzRepository.GetByCustomer(customerId);
            if(dotz == null)
                throw new Exception("Customer has no balance");
            var dz = new Dz(dotz.Id, dotz.CustomerId, valueDz);
            await _dotzRepository.Update(dz);
            return new DotzViewModel(dz, _config.Value.DZ_AMOUNT_IN_REAL);
        }
    }
}
