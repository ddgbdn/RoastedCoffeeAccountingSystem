using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public sealed class RoastingNotFoundException : NotFoundException
    {
        public RoastingNotFoundException(int id) : base($"The roasting with id: {id} could not be found") 
        {
        }
    }
}
