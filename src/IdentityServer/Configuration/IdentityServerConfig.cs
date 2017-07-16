using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace OidcDemo.Services.Identity.Configuration
{
    public static class IdentityServerConfig
    {
        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {

            };
        }

        public static IEnumerable<IdentityResource> GetResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<Client> GetClients(Dictionary<string, string> clientsUrl)
        {
            return new List<Client>
            {
                // JavaScript Client
                new Client
                {
                    ClientId = "angular-client",
                    ClientName = "Angular OpenId Client",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris =           { $"{clientsUrl["Angular"]}/signin-callback-oidc.html" },
                    RequireConsent = false,
                    PostLogoutRedirectUris = { $"{clientsUrl["Angular"]}/signout-callback-oidc.html" },
                    AllowedCorsOrigins =     { $"{clientsUrl["Angular"]}" },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                    }
                }
            };
        }
    }
}
