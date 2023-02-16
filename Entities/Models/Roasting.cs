using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class Roasting
    {
        public int Id { get; set; }

        [Column(TypeName = "Date")]
        public DateTime Date { get; set; }

        [Range(0, 100)]
        public double Amount { get; set; }

        [Required]
        public int CoffeeId { get; set; }
        public GreenCoffee Coffee { get; set; } = null!;
    }
}
