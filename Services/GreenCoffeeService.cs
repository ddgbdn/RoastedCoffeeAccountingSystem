using Contracts;
using RoastedCoffeeAccountingSystem.Models;
using ServiceContracts;
using Shared.DataTransferObjects;

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

        public IEnumerable<GreenCoffeeDto> GetAllGreenCoffee(bool trackChanges)
        {
                var coffee = _repository.GreenCoffee.GetAllGreenCoffee(trackChanges);

                var coffeeDto = coffee // AutoMapper?
                    .Select(c => new GreenCoffeeDto(
                        c.Id,
                        c.Variety,
                        string.Join(' ', c.Country, c.Region).TrimEnd(),
                        c.Weight))
                    .ToList();

                return coffeeDto;            
        }
    }
}
