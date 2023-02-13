using Shared.DataTransferObjects;

namespace ServiceContracts
{
    public interface IRoastingsService
    {
        IEnumerable<RoastingDto> GetRoastings(bool trackChanges);
        RoastingDto GetRoasting(int id, bool trackChanges);
    }
}
