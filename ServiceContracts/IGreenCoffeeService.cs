using Shared.DataTransferObjects;

namespace ServiceContracts
{
    public interface IGreenCoffeeService
    {
        Task<IEnumerable<GreenCoffeeDto>> GetAllGreenCoffeeAsync(bool trackChanges);
        Task<GreenCoffeeDto> GetGreenCoffeeAsync(int id, bool trackChanges);
        Task<GreenCoffeeDto> CreateGreenCoffeeAsync(GreenCoffeeCreationDto greenCoffee);
        Task DeleteGreenCoffeeAsync(int id, bool trackChanges);
        Task UpdateGreenCoffeeAsync(int id, GreenCoffeeUpdateDto greenCoffee, bool trackChanges);
    }
}
