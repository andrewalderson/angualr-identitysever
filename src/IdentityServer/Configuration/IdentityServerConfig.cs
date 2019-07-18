using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace OidcDemo.Services.Identity.Configuration
{
    public static class IdentityServerConfig
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {

            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<Client> GetClients(IHostingEnvironment environment, IConfiguration configuration)
        {
            var clientUrls = new Dictionary<string, string>
            {
                { "AngularClient", configuration.GetValue<string>("Urls:AngularClient") }
            };

            var clients = new List<Client>();

            if (environment.IsDevelopment())
            {
                clients.Add(
                    new Client
                    {
                        ClientId = "postman-client",
                        ClientName = "Postman Test Client",
                        AllowedGrantTypes = GrantTypes.Code,
                        RequireConsent = false,
                        RedirectUris = { "https://www.getpostman.com/oauth2/callback" },
                        PostLogoutRedirectUris = { "https://www.getpostman.com" },
                        AllowedCorsOrigins = { "https://www.getpostman.com" },
                        AllowedScopes =
                        {
                            IdentityServerConstants.StandardScopes.OpenId,
                            IdentityServerConstants.StandardScopes.Profile
     
                        },
                        ClientSecrets = { new Secret("secret".Sha256()) }
                    });

            }
            clients.Add(
                new Client
                {
                    ClientId = "angular-client",
                    ClientName = "Angular OpenId Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = new List<string> { $"{clientUrls["AngularClient"]}/signin-callback", $"{clientUrls["AngularClient"]}/renew-callback-oidc.html" },
                    RequireConsent = false,
                    PostLogoutRedirectUris = new List<string> { $"{clientUrls["AngularClient"]}/signout-callback" },
                    AllowedCorsOrigins = new List<string> { $"{clientUrls["AngularClient"]}" },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    }
                });
            return clients;
        }
    }
}
