using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class DateRangeBadRequestException : BadRequestException
    {
        public DateRangeBadRequestException() : base("End date can't be earlier than start date.")
        {
        }
    }
}
