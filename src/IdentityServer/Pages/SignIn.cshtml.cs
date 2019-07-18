using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using IdentityServer4.Events;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OidcDemo.Services.Identity.Models;
using OidcDemo.Services.Identity.Properties;

namespace PhilAndHope.Core.Identity.Api.Pages
{
    public class SignInModel : PageModel
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IIdentityServerInteractionService identityServerInteractionService;
        private readonly IEventService eventService;

        public SignInModel(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IIdentityServerInteractionService identityServerInteractionService, IEventService eventService)
        {
            this.userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            this.identityServerInteractionService = identityServerInteractionService ?? throw new ArgumentNullException(nameof(identityServerInteractionService));
            this.eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
        }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            [Display(Name = "Email Address")]
            public string Username { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Display(Name = "Keep me signed in?")]
            public bool RememberMe { get; set; }
        }

        [BindProperty]
        public InputModel Input { get; set; }
        public string ReturnUrl { get; set; }

        public void OnGet(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
            if (!ModelState.IsValid)
            {
                return Page();
            }
            var result = await signInManager.PasswordSignInAsync(Input.Username, Input.Password, Input.RememberMe, lockoutOnFailure: false);
            if(!result.Succeeded)
            {
                await eventService.RaiseAsync(new UserLoginFailureEvent(Input.Username, Resources.InvalidUsernameOrPasswordError));
                ModelState.AddModelError(string.Empty, Resources.InvalidUsernameOrPasswordError);
                return Page();
            }

            var user = await userManager.FindByNameAsync(Input.Username);
            await eventService.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id.ToString(), user.UserName));

            var context = await identityServerInteractionService.GetAuthorizationContextAsync(returnUrl);
            if (context != null)
            {
                return Redirect(returnUrl);
            }
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            if (string.IsNullOrEmpty(returnUrl))
            {
                return Redirect("~/");
            }

            throw new Exception("invalid return URL");
        }
    }
}