using Microsoft.AspNetCore.Mvc;
using ServiceContracts;
using Shared.DataTransferObjects;

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

        [HttpPost]
        public IActionResult CreateCoffee([FromBody] GreenCoffeeCreationDto coffee)
        {
            if (coffee is null)
                return BadRequest("GreenCoffeeCreation object is null");

            var createdCoffee = _service.GreenCoffeeService.CreateGreenCoffee(coffee);
            return CreatedAtAction(nameof(GetCoffee), new {id = createdCoffee.Id}, createdCoffee);
        }
    }
}
