using Dotz.Api.Configurations.Authentication;
using Dotz.Api.Configurations.MigrationDb;
using Dotz.Api.Configurations.Swagger;
using Dotz.Domain.Configurations;
using Dotz.Infrastructure.Data;
using Dotz.Infrastructure.IoC;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

namespace Dotz.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            var connectionString = Configuration.GetConnectionString("DotzConnectionString");
            InitialDb.WaitForDBInit(connectionString);
            services.AddDbContextPool<DotzDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
                        
            services.AddCors();

            services.AddConfigAuthentication();

            services.AddControllers();

            services.AddSwaggerConfiguration();

            services.Configure<DomainConfiguration>(Configuration.GetSection("DomainConfiguration"));

            services.AddControllersWithViews()
                .AddJsonOptions(options =>
                 options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

            RegisterServices(services, connectionString);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {           
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();  
                app.UseSwaggerSetup();              
            }            

            InitialDb.InitialMigration(app);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
            );

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private static void RegisterServices(IServiceCollection services, string connection)
        {            
            NativeInjectorBootStrapper.RegisterServices(services, connection);
        }
    }
}
