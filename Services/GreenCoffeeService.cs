using AutoMapper;
using Contracts;
using Entities.Exceptions;
using RoastedCoffeeAccountingSystem.Models;
using ServiceContracts;
using Shared.DataTransferObjects;

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


        public IEnumerable<GreenCoffeeDto> GetAllGreenCoffee(bool trackChanges)
        {
                var coffee = _repository.GreenCoffee.GetAllGreenCoffee(trackChanges);

                return _mapper.Map<IEnumerable<GreenCoffeeDto>>(coffee);     
        }

        public GreenCoffeeDto GetGreenCoffee(int id, bool trackChanges)
        {
            var coffee = _repository.GreenCoffee.GetGreenCoffee(id, trackChanges);
            if (coffee is null)
                throw new GreenCoffeeNotFoundException(id);

            return _mapper.Map<GreenCoffeeDto>(coffee);
        }

        public GreenCoffeeDto CreateGreenCoffee(GreenCoffeeCreationDto greenCoffee)
        {
            var coffeeEntity = _mapper.Map<GreenCoffee>(greenCoffee);

            _repository.GreenCoffee.CreateGreenCoffee(coffeeEntity);
            _repository.Save();

            return _mapper.Map<GreenCoffeeDto>(coffeeEntity);
        }

        public void DeleteGreenCoffee(int id, bool trackChanges)
        {
            var coffee = _repository.GreenCoffee.GetGreenCoffee(id, trackChanges);
            if (coffee is null)
                throw new GreenCoffeeNotFoundException(id);

            _repository.GreenCoffee.DeleteGreenCoffee(coffee);
            _repository.Save();
        }
    }
}
