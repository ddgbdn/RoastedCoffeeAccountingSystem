using RoastedCoffeeAccountingSystem.Models;

namespace Contracts
{
    public interface IGreenCoffeeRepository
    {
        IEnumerable<GreenCoffee> GetAllGreenCoffee(bool trackChanges);
        GreenCoffee GetGreenCoffee(int id, bool trackChanges);
    }
}
