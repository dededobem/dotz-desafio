using Dotz.Application.Interfaces;
using Dotz.Application.Services;
using Dotz.Domain.Interfaces;
using Dotz.Infrastructure.Data;
using Dotz.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dotz.Infrastructure.IoC
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services, string connection)
        {
            services.AddDbContextPool<DotzDbContext>(options =>
                options.UseMySql(connection, ServerVersion.AutoDetect(connection)));

            services.AddScoped(typeof(IDotzRepository), typeof(DotzRepository));
            services.AddScoped(typeof(IAppDotz), typeof(AppDotz));

            services.AddScoped(typeof(ITransactionRepository), typeof(TransactionRepository));
            services.AddScoped(typeof(IAppTransaction), typeof(AppTransaction));
            
            services.AddScoped(typeof(IAppConversion), typeof(AppConversion));
        }
    }
}
