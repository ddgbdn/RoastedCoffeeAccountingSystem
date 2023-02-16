using Contracts;

namespace Repository
{
    public sealed class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly Lazy<IGreenCoffeeRepository> _greenCoffeeRepository;
        private readonly Lazy<IRoastingsRepository> _roastingsRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _greenCoffeeRepository = new Lazy<IGreenCoffeeRepository>(() => new GreenCoffeeRepository(repositoryContext));
            _roastingsRepository = new Lazy<IRoastingsRepository>(() => new RoastingRepository(repositoryContext));
        }

        public IGreenCoffeeRepository GreenCoffee => _greenCoffeeRepository.Value;
        public IRoastingsRepository Roastings => _roastingsRepository.Value;

        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
