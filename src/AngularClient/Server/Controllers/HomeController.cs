using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OidcDemo.Web.AngularClient.Configuration;

namespace OidcDemo.Web.AngularClient.Server.Controllers
{
  public class HomeController : Controller
  {

    private readonly AppSettings _appSettings;

    public HomeController(IOptionsSnapshot<AppSettings> appSettings)
    {
      _appSettings = appSettings.Value;
    }

    [HttpGet]
    [Route("/configuration")]
    public IActionResult Configuration()
    {
      return Json(_appSettings);
    }
  }
}
