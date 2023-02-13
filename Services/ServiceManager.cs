using AutoMapper;
using Contracts;
using ServiceContracts;

namespace Services
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IGreenCoffeeService> _greenCoffeeService;
        private readonly Lazy<IRoastingsService> _roastingsService;

        public ServiceManager(IRepositoryManager repositoryManager, ILoggerManager logger, IMapper mapper)
        {
            _greenCoffeeService = new Lazy<IGreenCoffeeService>(()
                => new GreenCoffeeService(repositoryManager, logger, mapper));
            _roastingsService = new Lazy<IRoastingsService>(()
                => new RoastingsService(repositoryManager, logger, mapper));
        }

        public IGreenCoffeeService GreenCoffeeService => _greenCoffeeService.Value;
        public IRoastingsService RoastingsService => _roastingsService.Value;
    }
}
