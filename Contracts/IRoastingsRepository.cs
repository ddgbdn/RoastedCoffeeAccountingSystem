using RoastedCoffeeAccountingSystem.Models;

namespace Contracts
{
    public interface IRoastingsRepository
    {
        Task<IEnumerable<Roasting>> GetRoastingsAsync(bool trackChanges);
        Task<Roasting> GetRoastingAsync(int id, bool trackChanges);
        void CreateRoasting(Roasting roasting);
        void DeleteRoasting(Roasting roasitng);
    }
}
