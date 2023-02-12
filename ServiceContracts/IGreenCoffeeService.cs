using Shared.DataTransferObjects;

namespace ServiceContracts
{
    public interface IGreenCoffeeService
    {
        IEnumerable<GreenCoffeeDto> GetAllGreenCoffee(bool trackChanges);
    }
}
