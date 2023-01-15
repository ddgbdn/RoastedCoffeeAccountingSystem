namespace RoastedCoffeeAccountingSystem.Models
{
    public class GreenCoffee
    {
        public int Id { get; set; }
        public string Variety { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string Region { get; set; } = null!;
        public double Weight { get; set; }
    }
}
