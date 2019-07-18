using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OidcDemo.Web.AngularClient.Configuration;
using System.IO;

namespace OidcDemo.Web.AngularClient
{
  public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
          this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(configuration);

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Use(async (context, next) =>
            {
                  await next();

                  if (!Path.HasExtension(context.Request.Path.Value) && !context.Request.Path.Value.StartsWith("/configuration"))
                  {
                    context.Request.Path = new PathString("/index.html");
                    await next();
                  }
            });


            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
          }
    }
}
