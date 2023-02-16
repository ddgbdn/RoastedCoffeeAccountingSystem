﻿using Contracts;
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

        public GreenCoffee GetGreenCoffee(int id, bool trackChanges)
            => FindByCondition(c => c.Id == id, trackChanges)
                .SingleOrDefault();

        public void CreateGreenCoffee(GreenCoffee greenCoffee) => Create(greenCoffee);

        public void DeleteGreenCoffee(GreenCoffee greenCoffee) => Delete(greenCoffee);
    }
}