using RoastedCoffeeAccountingSystem.Models;

namespace Contracts
{
    public interface IRoastingsRepository
    {
        IEnumerable<Roasting> GetRoastings(bool trackChanges);
        Roasting GetRoasting(int id, bool trackChanges);
        void CreateRoasting(Roasting roasting);
    }
}
