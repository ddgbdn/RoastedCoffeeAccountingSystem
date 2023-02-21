using Contracts;
using LoggerService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Repository;
using ServiceContracts;
using Services;

namespace RoastedCoffeeAccountingSystem.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureLoggerService(this IServiceCollection services)
            => services.AddSingleton<ILoggerManager, LoggerManager>();

        public static void ConfigureRepositoryManager(this IServiceCollection services)
            => services.AddScoped<IRepositoryManager, RepositoryManager>();

        public static void ConfigureServiceManager(this IServiceCollection services)
            => services.AddScoped<IServiceManager, ServiceManager>();

        public static void ConfigureSQLContext(this IServiceCollection services, IConfiguration configuration)
            => services.AddDbContext<RepositoryContext>(options
                => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        public static void AddCustomMediaType(this IServiceCollection services)
        {
            services.Configure<MvcOptions>(cfg =>
            {
                var jsonOutputFormatter = cfg.OutputFormatters
                .OfType<SystemTextJsonOutputFormatter>()?.FirstOrDefault();

                if (jsonOutputFormatter is not null)
                    jsonOutputFormatter.SupportedMediaTypes.Add("application/hateoas+json");
            });
        }
    }
}
