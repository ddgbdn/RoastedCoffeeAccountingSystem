using Contracts;
using RoastedCoffeeAccountingSystem.Models;
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

        public IEnumerable<GreenCoffee> GetAllGreenCoffee(bool trackChanges)
        {
            try
            {
                return _repository.GreenCoffee.GetAllGreenCoffee(trackChanges);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occured in the {nameof(GetAllGreenCoffee)}. {ex}");
                throw;
            }
        }
    }
}
