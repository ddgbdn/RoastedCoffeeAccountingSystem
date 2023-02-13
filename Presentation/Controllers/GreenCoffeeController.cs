using Microsoft.AspNetCore.Mvc;
using ServiceContracts;

namespace RoastedCoffeeAccountingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GreenCoffeeController : ControllerBase
    {
        private readonly IServiceManager _service;

        public GreenCoffeeController(IServiceManager service) => _service = service;

        [HttpGet]
        public IActionResult GetAllCoffee()
        {
            var coffee = _service.GreenCoffeeService.GetAllGreenCoffee(false);
            return Ok(coffee);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetCoffee(int id)
        {
            var coffee = _service.GreenCoffeeService.GetGreenCoffee(id, false);
            return Ok(coffee);
        }
    }
}
