using Contracts;
using Microsoft.EntityFrameworkCore;
using RoastedCoffeeAccountingSystem.Models;
using Shared.RequestFeatures;

namespace Repository
{
    public class GreenCoffeeRepository : RepositoryBase<GreenCoffee>, IGreenCoffeeRepository
    {
        public GreenCoffeeRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }


        public async Task<PagedList<GreenCoffee>> GetAllGreenCoffeeAsync(GreenCoffeeParameters parameters, bool trackChanges)
        {
            var coffee = await FindByCondition(
                    c => !c.IsExhausted
                    || (c.IsExhausted && parameters.IncludeExhausted), trackChanges)
                .OrderByDescending(c => !c.IsExhausted)
                .ThenBy(c => c.Id)
                .ToListAsync();

            return PagedList<GreenCoffee>.ToPagedList(coffee, parameters.PageNumber, parameters.PageSize);
        }

        public async Task<GreenCoffee?> GetGreenCoffeeAsync(int id, bool trackChanges)
            => await FindByCondition(c => c.Id == id, trackChanges)
                .SingleOrDefaultAsync();

        public void CreateGreenCoffee(GreenCoffee greenCoffee) => Create(greenCoffee);

        public void DeleteGreenCoffee(GreenCoffee greenCoffee) => Delete(greenCoffee);
    }
}
