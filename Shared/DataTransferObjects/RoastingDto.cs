using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record RoastingDto(int Id, int CoffeeId, string CoffeeFullRegion, DateTime Date, double Amount);
}
