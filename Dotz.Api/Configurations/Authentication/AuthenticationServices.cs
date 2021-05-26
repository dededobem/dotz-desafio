using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;

namespace Dotz.Api.Configurations.Authentication
{
    public static class AuthenticationServices
    {
        public static void AddConfigAuthentication(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://securetoken.google.com/dotz-35e29";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "https://securetoken.google.com/dotz-35e29",
                        ValidateAudience = true,
                        ValidAudience = "dotz-35e29",
                        ValidateLifetime = true
                    };
                });
        }
    }
}
