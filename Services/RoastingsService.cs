using AutoMapper;
using Contracts;
using Entities.Exceptions;
using RoastedCoffeeAccountingSystem.Models;
using ServiceContracts;
using Shared.DataTransferObjects;

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


        public IEnumerable<RoastingDto> GetRoastings(bool trackChanges)
        {
            var roastings = _repository.Roastings.GetRoastings(trackChanges);
            
            return _mapper.Map<IEnumerable<RoastingDto>>(roastings);
        }
        public RoastingDto GetRoasting(int id, bool trackChanges)
        {
            var roasting = _repository.Roastings.GetRoasting(id, trackChanges);
            if (roasting is null)
                throw new RoastingNotFoundException(id);

            return _mapper.Map<RoastingDto>(roasting);
        }

        public RoastingDto CreateRoasting(RoastingCreationDto roasting)
        {
            var roastingEntity = _mapper.Map<Roasting>(roasting);

            _repository.Roastings.CreateRoasting(roastingEntity);
            _repository.Save();

            return _mapper.Map<RoastingDto>(roastingEntity);
        }
    }
}
