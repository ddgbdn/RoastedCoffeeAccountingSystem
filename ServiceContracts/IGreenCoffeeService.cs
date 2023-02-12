using RoastedCoffeeAccountingSystem.Models;

namespace ServiceContracts
{
    public interface IGreenCoffeeService
    {
        IEnumerable<GreenCoffee> GetAllGreenCoffee(bool trackChanges);
    }
}
