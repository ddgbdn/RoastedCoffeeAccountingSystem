using System.ComponentModel.DataAnnotations;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class GreenCoffee
    {
        public int Id { get; set; }
        public string Variety { get; set; } = null!;

        [MaxLength(60)]
        public string? Country { get; set; }

        [MaxLength(60)]
        public string? Region { get; set; }
        public double Weight { get; set; }
        public ICollection<Roasting>? Roastings { get; set; }
    }
}
