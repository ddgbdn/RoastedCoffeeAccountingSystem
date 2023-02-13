using Contracts;
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
                .ToList();

        public Roasting GetRoasting(int id, bool trackChanges)
            => FindByCondition(r => r.Id == id, trackChanges)
                .OrderByDescending(r => r.Id)
                .SingleOrDefault();

    }
}
