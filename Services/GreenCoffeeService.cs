using AutoMapper;
using Contracts;
using RoastedCoffeeAccountingSystem.Exceptions;
using RoastedCoffeeAccountingSystem.Models;
using ServiceContracts;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;

namespace Services
{
    internal sealed class GreenCoffeeService : IGreenCoffeeService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public GreenCoffeeService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }


        public async Task<(IEnumerable<GreenCoffeeDto> coffee, MetaData metaData)> GetAllGreenCoffeeAsync(GreenCoffeeParameters parameters, bool trackChanges)
        {
            var coffeeWithMetaData = await _repository.GreenCoffee.GetAllGreenCoffeeAsync(parameters, trackChanges);
            var coffeeDtos = _mapper.Map<IEnumerable<GreenCoffeeDto>>(coffeeWithMetaData);

            return (coffeeDtos, coffeeWithMetaData.MetaData);
        }

        public async Task<GreenCoffeeDto> GetGreenCoffeeAsync(int id, bool trackChanges)
        {
            var coffeeEntity = await GetCoffeeWithNullCheck(id, trackChanges);

            return _mapper.Map<GreenCoffeeDto>(coffeeEntity);
        }

        public async Task<GreenCoffeeDto> CreateGreenCoffeeAsync(GreenCoffeeCreationDto greenCoffee)
        {
            var coffeeEntity = _mapper.Map<GreenCoffee>(greenCoffee);

            _repository.GreenCoffee.CreateGreenCoffee(coffeeEntity);
            await _repository.SaveAsync();

            return _mapper.Map<GreenCoffeeDto>(coffeeEntity);
        }

        public async Task DeleteGreenCoffeeAsync(int id, bool trackChanges)
        {
            var coffeeEntity = await GetCoffeeWithNullCheck(id, trackChanges);

            _repository.GreenCoffee.DeleteGreenCoffee(coffeeEntity);
            await _repository.SaveAsync();
        }

        public async Task UpdateGreenCoffeeAsync(int id, GreenCoffeeUpdateDto greenCoffee, bool trackChanges)
        {
            var coffeeEntity = await GetCoffeeWithNullCheck(id, trackChanges);

            _mapper.Map(greenCoffee, coffeeEntity); // Modification is done here. 
            await _repository.SaveAsync();
        }

        public async Task<GreenCoffeeStatsDto> GetGreenCoffeeStatsAsync()
        {
            var coffeeStats = await _repository.GreenCoffee.GetGreenCoffeeStatsAsync();
            return _mapper.Map<GreenCoffeeStatsDto>(coffeeStats);
        }

        private async Task<GreenCoffee> GetCoffeeWithNullCheck(int id, bool trackChanges)
        {
            var coffee = await _repository.GreenCoffee.GetGreenCoffeeAsync(id, trackChanges);
            if (coffee is null)
                throw new GreenCoffeeNotFoundException(id);

            return coffee;
        }

    }
}
