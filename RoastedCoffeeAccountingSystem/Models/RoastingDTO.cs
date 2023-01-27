using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoastedCoffeeAccountingSystem.Models
{
    public class RoastingDTO
    {         
        public double Amount { get; set; }
        public int CoffeeId { get; set; }
    }
}
