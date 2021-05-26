using Dotz.Domain.Entities;
using System;
using Xunit;

namespace Dotz.Domain.Tests.Entities
{
    public class DotzTests
    {
        [Fact(DisplayName = "Get Current Balance in Real")]
        [Trait("Category", "Dotz - New Dotz")]
        public void Dotz_ConvertDzToReal_ShouldReturnCorrectConversion()
        {
            //Arrange
            var dotz = new Dz(Guid.NewGuid(), Guid.NewGuid().ToString(), 4000);
            var aliquot = new TestsConfiguration().ReturnAliquotDz();
            var realValue = dotz.CurrentBalance * aliquot;

            //Act & Assert
            Assert.Equal(realValue, dotz.GetCurrentBalanceReal(aliquot));
        }

        [Fact(DisplayName = "Update Current Balance")]
        [Trait("Category", "Dotz - New Dotz")]
        public void Dotz_UpdateBalanceDz_ShouldReturnCorrectValue()
        {
            //Arrange
            var dotz = new Dz(Guid.NewGuid(), Guid.NewGuid().ToString(), 5000);

            //Act
            dotz.UpdateCurrentBalance(1000);

            //Assert
            Assert.Equal(6000, dotz.CurrentBalance);
        }
    }
}
