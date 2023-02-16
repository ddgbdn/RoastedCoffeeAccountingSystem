using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public abstract record RoastingManipulationDto
    {
        [Required(ErrorMessage = "CoffeeId field is required")]
        public int CoffeeId { get; init; }

        [Range(0.01, 100, ErrorMessage = "Amount should be greater than 0 and not more than 100 kgs and is required")]
        public double Amount { get; init; }
    }
}
