using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoastedCoffeeAccountingSystem.Exceptions
{
    public sealed class RoastingNotFoundException : NotFoundException
    {
        public RoastingNotFoundException(int id) : base($"Roasting with id: {id} could not be found") 
        {
        }
    }
}
