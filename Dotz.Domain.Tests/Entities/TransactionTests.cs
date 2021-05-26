using Dotz.Domain.Entities;
using Dotz.Domain.Enums;
using System;
using Xunit;

namespace Dotz.Domain.Tests.Entities
{
    public class TransactionTests
    {
        [Theory(DisplayName = "Set positive value according to the operation type")]
        [Trait("Category", "Transaction - New Transaction")]
        [InlineData(OperationType.CREDITO, 100)]
        public void Transaction_SetPositiveValue_ShouldReturnPositiveValue(OperationType type, double dz)
        {
            //Arrange
            var transaction = new Transaction(Guid.NewGuid(), Guid.NewGuid().ToString(), 
                type, "Bancos", "Transferência de Pontos", dz);

            //Act & Assert
            Assert.Equal(dz, transaction.CalculateByOperation(transaction.Dz));

        }

        [Theory(DisplayName = "Set negative value according to the operation type")]
        [Trait("Category", "Transaction - New Transaction")]
        [InlineData(OperationType.DEBITO, 500)]
        [InlineData(OperationType.EXPIRACAO, 3000)]
        [InlineData(OperationType.TROCA, 950)]
        public void Transaction_SetNegativeValue_ShouldReturnNegativeValue(OperationType type, double dz)
        {
            //Arrange
            var transaction = new Transaction(Guid.NewGuid(), Guid.NewGuid().ToString(),
                type, "Dotz", "Perda, expiração ou troca de dotz", dz);

            //Act & Assert
            Assert.Equal(dz*(-1), transaction.CalculateByOperation(dz));

        }
    }
}
