using Contracts;
using Microsoft.EntityFrameworkCore;
using RoastedCoffeeAccountingSystem.Models;

namespace Repository
{
    public class GreenCoffeeRepository : RepositoryBase<GreenCoffee>, IGreenCoffeeRepository
    {
        public GreenCoffeeRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }


        public async Task<IEnumerable<GreenCoffee>> GetAllGreenCoffeeAsync(bool trackChanges)
            => await FindAll(trackChanges)
                .OrderByDescending(c => c.Id)
                .ToListAsync();

        public async Task<GreenCoffee?> GetGreenCoffeeAsync(int id, bool trackChanges)
            => await FindByCondition(c => c.Id == id, trackChanges)
                .SingleOrDefaultAsync();

        public void CreateGreenCoffee(GreenCoffee greenCoffee) => Create(greenCoffee);

        public void DeleteGreenCoffee(GreenCoffee greenCoffee) => Delete(greenCoffee);
    }
}
