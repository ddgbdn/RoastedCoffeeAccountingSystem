namespace Contracts
{
    public interface IRepositoryManager
    {
        IGreenCoffeeRepository GreenCoffee { get; }
        IRoastingsRepository Roastings { get; }

        Task SaveAsync();
    }
}
