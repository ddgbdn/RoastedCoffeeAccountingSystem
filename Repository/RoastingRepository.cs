using Contracts;
using Microsoft.EntityFrameworkCore;
using RoastedCoffeeAccountingSystem.Models;

namespace Repository
{
    public class RoastingRepository : RepositoryBase<Roasting>, IRoastingsRepository
    {
        public RoastingRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Roasting>> GetRoastingsAsync(bool trackChanges)
            => await FindAll(trackChanges)
                .OrderByDescending(r => r.Id)
                .Include(c => c.Coffee)
                .ToListAsync();

        public async Task<Roasting>GetRoastingAsync(int id, bool trackChanges)
            => await FindByCondition(r => r.Id == id, trackChanges)
                .OrderByDescending(r => r.Id)
                .Include(c => c.Coffee)
                .SingleOrDefaultAsync();

        public void CreateRoasting(Roasting roasting)
        {
            Create(roasting);
            roasting.Coffee = RepositoryContext.GreenCoffee!.Find(roasting.CoffeeId)!; // Feels wrong. REINSPECT    Don't map coffee full adress??
        }

        public void DeleteRoasting(Roasting roasting) => Delete(roasting);
    }
}
