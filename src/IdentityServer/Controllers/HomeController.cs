using Microsoft.AspNetCore.Mvc;

namespace OidcDemo.Services.Identity.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Error()
        {
            return View();
        }
    }
}
