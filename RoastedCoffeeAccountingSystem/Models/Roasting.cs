namespace RoastedCoffeeAccountingSystem.Models
{
    public class Roasting
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public GreenCoffee Coffee { get; set; } = null!;
        public double Amount { get; set; }
    }
}
