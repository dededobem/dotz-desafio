using Dotz.Application.Services;
using Dotz.Application.ViewModels;
using Dotz.Domain.Interfaces;
using Dotz.Domain.Tests;
using Moq;
using Moq.AutoMock;
using System.Threading.Tasks;
using Xunit;

namespace Dotz.Application.Tests.Services
{
    [Collection(nameof(TestsCollection))]
    public class AppDotzTests
    {
        private readonly TestsFixture _testsFixture;

        public AppDotzTests(TestsFixture testsFixture)
        {
            _testsFixture = testsFixture;
        }

        [Fact(DisplayName = "Add Dotz")]
        [Trait("Category", "App - Dotz")]
        public async Task AppDotz_AddNewDotz_ShouldAddNewDzSuccessfully()
        {
            //Arrange
            var dotz = _testsFixture.GenerateDz();
            var mock = new AutoMocker();
            var appDotz = mock.CreateInstance<AppDotz>();
            double aliquot = new TestsConfiguration().ReturnAliquotDz();

            //Act
            await appDotz.Add(new DotzViewModel(dotz, aliquot));

            //Assert
            mock.GetMock<IDotzRepository>().Verify(r => r.Add(dotz), Times.Never);
        }

        [Fact(DisplayName = "Return all dotz")]
        [Trait("Category", "App - Dotz")]
        public async Task AppDotz_ReturnAllDotz_ShouldReturnAllDotz()
        {
            //Arrange
            int quantityDz = 10;
            var dotz = _testsFixture.GenerateDzCollection(quantityDz);
            var mock = new AutoMocker();
            var appDotz = mock.CreateInstance<AppDotz>();

            //Act
            await appDotz.GetAll();

            //Assert
            mock.GetMock<IDotzRepository>().Verify(r => r.GetAll(), Times.Once);
            Assert.Equal(quantityDz, dotz.Count);
        }

    }
}
