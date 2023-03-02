using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class GreenCoffee
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Variety { get; set; } = null!;

        [MaxLength(60)]
        public string? Country { get; set; }

        [MaxLength(60)]
        public string? Region { get; set; }

        [Range(0, 1000)]
        public double Weight { get; set; }

        [Required]        
        public bool IsExhausted { get; set; }
        public ICollection<Roasting>? Roastings { get; set; }
    }
}
