using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class RoastingStats
    {
        public double AveragePerDay { get; set; }
        public double AveragePerDayThisMonth { get; set; }
        public double Total { get; set; }
        public double AverageTotal { get; set; }
        public double[] SixPreviousMonthsTotal { get; set; } = new double[6];
        public int WorkingDays { get; set; }
        public int WorkingDaysThisMonth { get; set; }
    }
}
