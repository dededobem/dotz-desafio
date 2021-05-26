using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Reflection;

namespace Dotz.Domain.Tests
{
    public class TestsConfiguration
    {
        public IConfiguration InitConfiguration()
        {           
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            return config;
        }

        public double ReturnAliquotDz()
        {
            var conf = InitConfiguration();
            var aliq = conf["DomainConfiguration:DZ_AMOUNT_IN_REAL"];
            return Double.Parse(aliq.Replace(".", ","));
        }
    }
}
