using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class RoastingDTO
    {         
        public int Id { get; set; }
        public double Amount { get; set; }
        public int CoffeeId { get; set; }
    }
}
