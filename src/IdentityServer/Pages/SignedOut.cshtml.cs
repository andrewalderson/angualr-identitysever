using IdentityServer4.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;

namespace PhilAndHope.Core.Identity.Api.Pages
{
    public class SignedOutModel : PageModel
    {
        private readonly IIdentityServerInteractionService _interactionService;

        public SignedOutModel(IIdentityServerInteractionService interactionService)
        {
            _interactionService = interactionService;
        }

        public string PostLogoutRedirectUri { get; set; }

        public string SignOutIframeUrl { get; set; }

        public bool AutomaticRedirectAfterSignOut { get; set; }

        public async Task OnGetAsync(string logoutId)
        {
            var context = await _interactionService.GetLogoutContextAsync(logoutId);
            PostLogoutRedirectUri = context?.PostLogoutRedirectUri;
            SignOutIframeUrl = context?.SignOutIFrameUrl;
            AutomaticRedirectAfterSignOut = !string.IsNullOrEmpty(PostLogoutRedirectUri);
        }
    }
}