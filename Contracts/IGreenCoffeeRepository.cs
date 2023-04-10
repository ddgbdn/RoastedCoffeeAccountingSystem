using RoastedCoffeeAccountingSystem.Models;
using Shared.RequestFeatures;

namespace Contracts
{
    public interface IGreenCoffeeRepository
    {
        Task<PagedList<GreenCoffee>> GetAllGreenCoffeeAsync(GreenCoffeeParameters parameters, bool trackChanges);
        Task<GreenCoffee?> GetGreenCoffeeAsync(int id, bool trackChanges);
        void CreateGreenCoffee(GreenCoffee greenCoffee);
        void DeleteGreenCoffee(GreenCoffee greenCoffee);
        Task<GreenCoffeeStats> GetGreenCoffeeStatsAsync();
    }
}
