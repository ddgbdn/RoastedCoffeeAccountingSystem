using Contracts;
using ServiceContracts;

namespace Services
{
    internal sealed class RoastingsService : IRoastingsService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;

        public RoastingsService(IRepositoryManager repository, ILoggerManager logger)
        {
            _repository = repository;
            _logger = logger;
        }
    }
}
