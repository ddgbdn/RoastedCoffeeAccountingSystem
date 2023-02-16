using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public abstract record GreenCoffeeManipulationDto
    {
        [Required(ErrorMessage = "Variety is a required field")]
        [MaxLength(20, ErrorMessage = "Maximum length for the Variety field is 20")]
        public string? Variety { get; init; }

        [MaxLength(60, ErrorMessage = "Maximum length for the Country field is 60")]
        public string? Country { get; init; }

        [MaxLength(60, ErrorMessage = "Maximum length for the Region field is 60")]
        public string? Region { get; init; }

        [Required(ErrorMessage = "Weight is required field")]
        [Range(0.01, 1000.0, ErrorMessage = "Weight should be greater than 0 and not more than 1000 kgs")]
        public double Weight { get; init; }
    }
}
