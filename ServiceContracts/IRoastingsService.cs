using Shared.DataTransferObjects;
using Shared.RequestFeatures;

namespace ServiceContracts
{
    public interface IRoastingsService
    {
        Task<(IEnumerable<RoastingDto> roastings, MetaData metaData)> GetRoastingsAsync(RoastingsParameters parameters, bool trackChanges);
        Task<RoastingDto> GetRoastingAsync(int id, bool trackChanges);
        Task<RoastingDto> CreateRoastingAsync(RoastingCreationDto roasting);
        Task DeleteRoastingAsync(int id, bool trackChanges);
        Task UpdateRoastingAsync(int id, RoastingUpdateDto roasting, bool trackChanges);
    }
}
