using Contracts;
using ServiceContracts;

namespace Services
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IGreenCoffeeService> _greenCoffeeService;
        private readonly Lazy<IRoastingsService> _roastingsService;

        public ServiceManager(IRepositoryManager repositoryManager, ILoggerManager logger)
        {
            _greenCoffeeService = new Lazy<IGreenCoffeeService>(()
                => new GreenCoffeeService(repositoryManager, logger));
            _roastingsService = new Lazy<IRoastingsService>(()
                => new RoastingsService(repositoryManager, logger));
        }

        public IGreenCoffeeService GreenCoffeeService => _greenCoffeeService.Value;
        public IRoastingsService RoastingsService => _roastingsService.Value;
    }
}
