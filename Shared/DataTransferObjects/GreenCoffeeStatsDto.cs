using RoastedCoffeeAccountingSystem.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record GreenCoffeeStatsDto(int TotalSacks, int AvailableSacks, double TotalAmount, double AvailableAmount, List<Country> Countries);
}
