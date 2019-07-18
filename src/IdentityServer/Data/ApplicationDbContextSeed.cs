using OidcDemo.Services.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OidcDemo.Services.Identity.Data
{
    public class ApplicationDbContextSeed
    {
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher = new PasswordHasher<ApplicationUser>();

        public async Task SeedAsync(ApplicationDbContext context, ILogger logger, int? retry = 0)
        {
            int retryForAvaiability = retry.Value;
            try
            {

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
                    logger.LogError(ex.Message);
                    await SeedAsync(context, logger, retryForAvaiability);
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
