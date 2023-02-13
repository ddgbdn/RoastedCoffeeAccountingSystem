using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public sealed class GreenCoffeeNotFoundException : NotFoundException
    {
        public GreenCoffeeNotFoundException(int id)
            : base($"Coffee with id: {id} could not be found.")
        {
        }
    }
}
