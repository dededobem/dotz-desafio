using System;
using System.Threading;
using Dotz.Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MySqlConnector;

namespace Dotz.Api.Configurations.MigrationDb
{
    public static class  InitialDb
    {
        public static void InitialMigration(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DotzDbContext>();
                Console.WriteLine("Appling Migrations...");
                context.Database.Migrate();
            }
        }
        
        public static void WaitForDBInit(string connectionString)
        {
            var connection = new MySqlConnection(connectionString);
            int retries = 1;
            while (retries < 7)
            {
                try
                {
                    Console.WriteLine("Connecting to db. Trial: {0}", retries);
                    connection.Open();
                    connection.Close();
                    break;
                }
                catch (MySqlException)
                {
                    Thread.Sleep((int) Math.Pow(2, retries) * 1000);
                    retries++;
                }
            }
        }
    }

}