using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record GreenCoffeeDto(int Id, string Variety, string FullRegion, double Weight, bool IsExhausted);
}
