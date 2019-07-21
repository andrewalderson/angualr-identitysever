using IdentityServer4.Events;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OidcDemo.Services.Identity.Models;
using System;
using System.Threading.Tasks;

namespace OidcDemo.Services.Identity.Pages
{
    [AllowAnonymous]
    public class SignOutModel : PageModel
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IIdentityServerInteractionService identityServerInteractionService;
        private readonly IEventService eventService;

        public SignOutModel(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IIdentityServerInteractionService identityServerInteractionService, IEventService eventService)
        {
            this.userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            this.identityServerInteractionService = identityServerInteractionService ?? throw new ArgumentNullException(nameof(identityServerInteractionService));
            this.eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
        }

        public string LogoutId { get; set; }

        public async Task<IActionResult> OnGetAsync(string logoutId)
        {
            var context = await identityServerInteractionService.GetLogoutContextAsync(logoutId);
            if (context.ShowSignoutPrompt == true)
            {
                LogoutId = logoutId;
                return Page();
            }

            return await OnPostAsync(logoutId);
        }

        public async Task<IActionResult> OnPostAsync(string logoutId)
        {
            if (User?.Identity.IsAuthenticated == true)
            {
                await signInManager.SignOutAsync();

                var user = await userManager.GetUserAsync(User);
                await eventService.RaiseAsync(new UserLogoutSuccessEvent(user.Id.ToString(), user.UserName));
            }

            return RedirectToPage("signedOut", new { logoutId });
        }
    }
}