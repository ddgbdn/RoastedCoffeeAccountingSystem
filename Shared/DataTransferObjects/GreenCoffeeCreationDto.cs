using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public record GreenCoffeeCreationDto(string Variety ,string Country, string Region, double Weight);
}
