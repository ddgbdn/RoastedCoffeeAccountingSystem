using AutoMapper;
using Contracts;
using Entities.ConfigurationModels;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Service;
using ServiceContracts;

namespace Services
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IGreenCoffeeService> _greenCoffeeService;
        private readonly Lazy<IRoastingsService> _roastingsService;
        private readonly Lazy<IAuthenticationService> _authenticationService;

        public ServiceManager(IRepositoryManager repositoryManager, 
            ILoggerManager logger, 
            IMapper mapper, 
            UserManager<User> userManager, 
            IOptions<JwtConfiguration> configuration)
        {
            _greenCoffeeService = new Lazy<IGreenCoffeeService>(()
                => new GreenCoffeeService(repositoryManager, logger, mapper));
            _roastingsService = new Lazy<IRoastingsService>(()
                => new RoastingsService(repositoryManager, logger, mapper));
            _authenticationService = new Lazy<IAuthenticationService>(()
                => new AuthenticationService(logger, mapper, configuration, userManager));
        }

        public IGreenCoffeeService GreenCoffeeService => _greenCoffeeService.Value;
        public IRoastingsService RoastingsService => _roastingsService.Value;
        public IAuthenticationService AuthenticationService=> _authenticationService.Value;
    }
}
