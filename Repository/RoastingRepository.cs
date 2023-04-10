using Contracts;
using Microsoft.EntityFrameworkCore;
using RoastedCoffeeAccountingSystem.Models;
using Shared.RequestFeatures;

namespace Repository
{
    public class RoastingRepository : RepositoryBase<Roasting>, IRoastingsRepository
    {
        public RoastingRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<PagedList<Roasting>> GetRoastingsAsync(RoastingsParameters parameters, bool trackChanges)
        {
            var roastings = await FindByCondition(
                    r => r.Date >= parameters.StartDate 
                    && r.Date <= parameters.EndDate, trackChanges)
                .OrderByDescending(r => r.Id)
                .Include(c => c.Coffee)
                .ToListAsync();

            return PagedList<Roasting>.ToPagedList(roastings, parameters.PageNumber, parameters.PageSize);
        }

        public async Task<Roasting?> GetRoastingAsync(int id, bool trackChanges)
            => await FindByCondition(r => r.Id == id, trackChanges)
                .OrderByDescending(r => r.Id)
                .Include(c => c.Coffee)
                .SingleOrDefaultAsync();

        public void CreateRoasting(Roasting roasting)
        {
            Create(roasting);
            //roasting.Coffee = RepositoryContext.GreenCoffee!.Find(roasting.CoffeeId)!; // Feels wrong. REINSPECT    Don't map coffee full adress??
        }

        public void DeleteRoasting(Roasting roasting) => Delete(roasting);

        public async Task<RoastingStats> GetRoastingStatsAsync(DateTime date)
        {
            var allRoastings = FindAll(false);

            var avgPerDay = await allRoastings.AverageAsync(r => r.Amount);
            var total = await allRoastings.SumAsync(r => r.Amount);
            var totalAvg = (await allRoastings
                .GroupBy(r => new {r.Date.Month, r.Date.Year})
                .Select(g => g.Sum(r => r.Amount))
                .ToListAsync())
                .Average();
            var workDays = await allRoastings
                .GroupBy(r => r.Date)
                .CountAsync();

            var startDate = new DateTime(date.Year, date.Month, 1);
            var endDate = new DateTime(date.Year, date.Month, DateTime.DaysInMonth(date.Year, date.Month));

            var monthRoastings = FindByCondition(
                r => r.Date >= startDate && r.Date <= endDate, false);

            double avgPerDayThisMonth = 0;
            int workDaysThisMonth = 0;

            if (monthRoastings.Count() > 0)
            {
                avgPerDayThisMonth = await monthRoastings.AverageAsync(r => r.Amount);
                workDaysThisMonth = await monthRoastings.GroupBy(r => r.Date).CountAsync();
            }

            var totalPerSixMonths = new double[6];

            for (int i = 0; i < 6; i++)
            {
                var nextStartDate = startDate.AddMonths(-i);
                var end = endDate.AddMonths(-i);
                var nextEndDate = new DateTime(end.Year, end.Month, DateTime.DaysInMonth(end.Year, end.Month));

                totalPerSixMonths[^(i + 1)] 
                    = await FindByCondition(
                        r => r.Date >= nextStartDate && r.Date <= nextEndDate,
                        false)
                        .SumAsync(r => r.Amount);
            }

            return new RoastingStats
            {
                AveragePerDay = avgPerDay,
                AveragePerDayThisMonth = avgPerDayThisMonth,
                Total = total,
                AverageTotal = totalAvg,
                SixPreviousMonthsTotal = totalPerSixMonths,
                WorkingDays = workDays,
                WorkingDaysThisMonth = workDaysThisMonth
            };
        }
    }
}
