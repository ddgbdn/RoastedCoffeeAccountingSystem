using RoastedCoffeeAccountingSystem.Models;
using Shared.RequestFeatures;

namespace Contracts
{
    public interface IRoastingsRepository
    {
        Task<PagedList<Roasting>> GetRoastingsAsync(RoastingsParameters parameters, bool trackChanges);
        Task<Roasting> GetRoastingAsync(int id, bool trackChanges);
        void CreateRoasting(Roasting roasting);
        void DeleteRoasting(Roasting roasitng);
    }
}
