using Shared.DataTransferObjects;

namespace ServiceContracts
{
    public interface IGreenCoffeeService
    {
        IEnumerable<GreenCoffeeDto> GetAllGreenCoffee(bool trackChanges);
        GreenCoffeeDto GetGreenCoffee(int id, bool trackChanges);
        GreenCoffeeDto CreateGreenCoffee(GreenCoffeeCreationDto greenCoffee);
        void DeleteGreenCoffee(int id, bool trackChanges);
        void UpdateGreenCoffee(int id, GreenCoffeeUpdateDto greenCoffee, bool trackChanges);
    }
}
