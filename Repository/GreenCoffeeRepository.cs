using Contracts;
using RoastedCoffeeAccountingSystem.Models;

namespace Repository
{
    public class GreenCoffeeRepository : RepositoryBase<GreenCoffee>, IGreenCoffeeRepository
    {
        public GreenCoffeeRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public IEnumerable<GreenCoffee> GetAllGreenCoffee(bool trackChanges)
            => FindAll(trackChanges)
                .OrderByDescending(c => c.Id)
                .ToList();
    }
}
