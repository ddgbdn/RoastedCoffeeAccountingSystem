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

        public IEnumerable<Roasting> GetRoastings(bool trackChanges)
            => FindAll(trackChanges)
                .OrderByDescending(r => r.Id)
                .Include(c => c.Coffee)
                .ToList();

        public Roasting GetRoasting(int id, bool trackChanges)
            => FindByCondition(r => r.Id == id, trackChanges)
                .OrderByDescending(r => r.Id)
                .Include(c => c.Coffee)
                .SingleOrDefault();

        public void CreateRoasting(Roasting roasting)
        {
            Create(roasting);
            roasting.Coffee = RepositoryContext.GreenCoffee!.Find(roasting.CoffeeId)!; // Feels wrong. REINSPECT    Don't map coffee full adress??
        }
    }
}
