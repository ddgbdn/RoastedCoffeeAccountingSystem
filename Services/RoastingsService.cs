﻿using AutoMapper;
using Contracts;
using RoastedCoffeeAccountingSystem.Exceptions;
using RoastedCoffeeAccountingSystem.Models;
using ServiceContracts;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;

namespace Services
{
    internal sealed class RoastingsService : IRoastingsService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;   

        public RoastingsService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }


        public async Task<(IEnumerable<RoastingDto> roastings, MetaData metaData)> GetRoastingsAsync(RoastingsParameters parameters, bool trackChanges)
        {
            if (!parameters.IsValidDataRange)
                throw new DateRangeBadRequestException();

            var roastingsWithMetaData = await _repository.Roastings.GetRoastingsAsync(parameters, trackChanges);
            var roastingsDto = _mapper.Map<IEnumerable<RoastingDto>>(roastingsWithMetaData);

            return (roastingsDto, roastingsWithMetaData.MetaData);
        }
        public async Task<RoastingDto> GetRoastingAsync(int id, bool trackChanges)
        {
            var roastingEntity = await GetRoastingWithNullCheck(id, trackChanges);

            return _mapper.Map<RoastingDto>(roastingEntity);
        }


        public async Task<RoastingDto> CreateRoastingAsync(RoastingCreationDto roasting)
        {
            var roastingEntity = _mapper.Map<Roasting>(roasting);

            _repository.Roastings.CreateRoasting(roastingEntity);
            await _repository.SaveAsync();

            return _mapper.Map<RoastingDto>(roastingEntity);
        }

        public async Task DeleteRoastingAsync(int id, bool trackChanges)
        {
            var roastingEntity = await GetRoastingWithNullCheck(id, trackChanges);

            _repository.Roastings.DeleteRoasting(roastingEntity);
            await _repository.SaveAsync();
        }

        public async Task UpdateRoastingAsync(int id, RoastingUpdateDto roasting, bool trackChanges)
        {
            var roastingEntity = await GetRoastingWithNullCheck(id, trackChanges);

            _mapper.Map(roasting, roastingEntity);
            await _repository.SaveAsync();
        }

        public async Task<RoastingStatsDto> GetRoastingStatsAsync(DateTime date)
        {
            if (date < new DateTime(2022, 1, 1))
                throw new DateBadRequestException();

            var roastingStats = await _repository.Roastings.GetRoastingStatsAsync(date);
            
            return _mapper.Map<RoastingStatsDto>(roastingStats);
        }

        private async Task<Roasting> GetRoastingWithNullCheck(int id, bool trackChanges)
        {
            var roasting = await _repository.Roastings.GetRoastingAsync(id, trackChanges);
            if (roasting is null)
                throw new RoastingNotFoundException(id);

            return roasting;
        }
    }
}
