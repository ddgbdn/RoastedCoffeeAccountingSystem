using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class GreenCoffeeStats
    {
        public int TotalSacks { get; set; }
        public int AvailableSacks { get; set; }
        public double TotalAmount { get; set; }
        public double AvailableAmount { get; set; }
        public List<Country> Countries { get; set; } = new List<Country>();
    }

    public class Country
    {
        public string Name { get; set; } = null!;
        public double Count { get; set; }
    }
}
