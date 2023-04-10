using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record RoastingStatsDto(double AveragePerDay, double AveragePerDayThisMonth, double Total, double AverageTotal, double[] SixPreviousMonthsTotal, int WorkingDays, int WorkingDaysThisMonth);
}
