using OidcDemo.Services.Identity.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OidcDemo.Services.Identity.Data
{
    public class ApplicationDbContextSeed
    {
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher;

        public ApplicationDbContextSeed(IPasswordHasher<ApplicationUser> passwordHasher)
        {
            _passwordHasher = passwordHasher;
        }

        public async Task SeedAsync(IApplicationBuilder applicationBuilder, IHostingEnvironment env, ILoggerFactory loggerFactory, int? retry = 0)
        {
            int retryForAvaiability = retry.Value;
            try
            {
                var log = loggerFactory.CreateLogger("application seed");

                var context = (ApplicationDbContext)applicationBuilder
                    .ApplicationServices.GetService(typeof(ApplicationDbContext));

                context.Database.Migrate();

                var contentRootPath = env.ContentRootPath;
                var webroot = env.WebRootPath;

                if (!context.Users.Any())
                {
                    context.Users.AddRange(GetDefaultUser());

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                if (retryForAvaiability < 10)
                {
                    retryForAvaiability++;
                    var log = loggerFactory.CreateLogger("application seed");
                    log.LogError(ex.Message);
                    await SeedAsync(applicationBuilder, env, loggerFactory, retryForAvaiability);
                }
            }
        }

        private IEnumerable<ApplicationUser> GetDefaultUser()
        {
            var user =
            new ApplicationUser()
            {
                Email = "demouser@mailinator.com",
                Id = Guid.NewGuid().ToString(),
                LastName = "Demo",
                FirstName = "User",
                PhoneNumber = "1234567890",
                UserName = "demouser@mailinator.com",
                NormalizedEmail = "DEMOUSER@MAILINATOR.COM",
                NormalizedUserName = "DEMOUSER@MAILINATOR.COM",
                SecurityStamp = Guid.NewGuid().ToString("D"),
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, "Pass@word1");

            return new List<ApplicationUser>()
            {
                user
            };
        }

    }
}
