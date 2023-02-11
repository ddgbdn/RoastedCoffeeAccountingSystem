using Contracts;
using ServiceContracts;

namespace Services
{
    internal sealed class GreenCoffeeService : IGreenCoffeeService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;

        public GreenCoffeeService(IRepositoryManager repository, ILoggerManager logger)
        {
            _repository = repository;
            _logger = logger;
        }
    }
}
