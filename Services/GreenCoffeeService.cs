﻿using AutoMapper;
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


        public async Task<IEnumerable<GreenCoffeeDto>> GetAllGreenCoffeeAsync(bool trackChanges)
        {
                var coffee = await _repository.GreenCoffee.GetAllGreenCoffeeAsync(trackChanges);

                return _mapper.Map<IEnumerable<GreenCoffeeDto>>(coffee);     
        }

        public async Task<GreenCoffeeDto> GetGreenCoffeeAsync(int id, bool trackChanges)
        {
            var coffee = await _repository.GreenCoffee.GetGreenCoffeeAsync(id, trackChanges);
            if (coffee is null)
                throw new GreenCoffeeNotFoundException(id);

            return _mapper.Map<GreenCoffeeDto>(coffee);
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
            var coffee = await _repository.GreenCoffee.GetGreenCoffeeAsync(id, trackChanges);
            if (coffee is null)
                throw new GreenCoffeeNotFoundException(id);

            _repository.GreenCoffee.DeleteGreenCoffee(coffee);
            await _repository.SaveAsync();
        }

        public async Task UpdateGreenCoffeeAsync(int id, GreenCoffeeUpdateDto greenCoffee, bool trackChanges)
        {
            var coffeeEntity = await _repository.GreenCoffee.GetGreenCoffeeAsync(id, trackChanges);
            if (greenCoffee is null)
                throw new GreenCoffeeNotFoundException(id);

            _mapper.Map(greenCoffee, coffeeEntity); // Modification is done here. 
            await _repository.SaveAsync();
        }
    }
}
