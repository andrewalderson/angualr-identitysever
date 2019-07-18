using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OidcDemo.Services.Identity.Models.AccountViewModels;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using OidcDemo.Services.Identity.Models;

namespace OidcDemo.Services.Identity.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;
        private readonly IIdentityServerInteractionService _interactionService;

        public AccountController(
            SignInManager<ApplicationUser> signInManager,
            IIdentityServerInteractionService interactionService,
            ILoggerFactory loggerFactory)
        {
            _signInManager = signInManager;
            _interactionService = interactionService;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    _logger.LogInformation(1, "User logged in.");
                    if (_interactionService.IsValidReturnUrl(returnUrl) || Url.IsLocalUrl(returnUrl))
                    {
                        return Redirect(returnUrl);
                    }
                    return Redirect("~/");
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning(2, "User account locked out.");
                    return View("Lockout");
                }
            }
            ViewData["ReturnUrl"] = returnUrl;
            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            return View(model);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Logout(string logoutId)
        {
            await HttpContext.SignOutAsync();

            var logout = await _interactionService.GetLogoutContextAsync(logoutId);
            return Redirect(logout?.PostLogoutRedirectUri);
        }
    }
}
