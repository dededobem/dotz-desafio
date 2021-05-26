using Bogus;
using Dotz.Domain.Entities;
using Dotz.Domain.Enums;
using System;
using System.Collections.Generic;
using Xunit;

namespace Dotz.Application.Tests
{
    [CollectionDefinition(nameof(TestsCollection))]
    public class TestsCollection : ICollectionFixture<TestsFixture> { }
    public class TestsFixture : IDisposable
    {
        public Dz GenerateDz() => new Dz(Guid.NewGuid(), Guid.NewGuid().ToString(), 1000);
        public Transaction GenerateTransaction() =>
            new Transaction(Guid.NewGuid(), Guid.NewGuid().ToString(),
                OperationType.CREDITO, "Bancos", "Transferência de Pontos", 2000);

        public ICollection<Dz> GenerateDzCollection(int quantity)
        {
            var dotz = new Faker<Dz>()
                .CustomInstantiator(f => new Dz(
                    Guid.NewGuid(),
                    Guid.NewGuid().ToString(),
                    f.Random.Double(1, 10000)
                    ));

            return dotz.Generate(quantity);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
