using Shared.DataTransferObjects;

namespace ServiceContracts
{
    public interface IRoastingsService
    {
        IEnumerable<RoastingDto> GetRoastings(bool trackChanges);
        RoastingDto GetRoasting(int id, bool trackChanges);
        RoastingDto CreateRoasting(RoastingCreationDto roasting);
        void DeleteRoasting(int id, bool trackChanges);
        void UpdateRoasting(int id, RoastingUpdateDto roasting, bool trackChanges);
    }
}
