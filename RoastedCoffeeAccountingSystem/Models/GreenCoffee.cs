namespace RoastedCoffeeAccountingSystem.Models
{
    public class GreenCoffee
    {
        public int Id { get; set; }
        public string Variety { get; set; } = null!;
        public string? Country { get; set; }
        public string? Region { get; set; }
        public double Weight { get; set; }
    }
}
