using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoastedCoffeeAccountingSystem.Exceptions
{
    public class DateBadRequestException : BadRequestException
    {
        public DateBadRequestException() : base("Date should be later than 01.01.2022") { }
    }
}
