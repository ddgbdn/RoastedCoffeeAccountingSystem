using RoastedCoffeeAccountingSystem.Models;

namespace Contracts
{
    public interface IGreenCoffeeRepository
    {
        Task<IEnumerable<GreenCoffee>> GetAllGreenCoffeeAsync(bool trackChanges);
        Task<GreenCoffee?> GetGreenCoffeeAsync(int id, bool trackChanges);
        void CreateGreenCoffee(GreenCoffee greenCoffee);
        void DeleteGreenCoffee(GreenCoffee greenCoffee);
    }
}
