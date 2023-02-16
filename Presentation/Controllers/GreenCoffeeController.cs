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
        public async Task<IActionResult> GetAllCoffee()
        {
            var coffee = await _service.GreenCoffeeService.GetAllGreenCoffeeAsync(false);
            return Ok(coffee);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCoffee(int id)
        {
            var coffee = await _service.GreenCoffeeService.GetGreenCoffeeAsync(id, false);
            return Ok(coffee);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCoffee([FromBody] GreenCoffeeCreationDto coffee)
        {
            if (coffee is null)
                return BadRequest("GreenCoffeeCreation object is null");

            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState); 

            var createdCoffee = await _service.GreenCoffeeService.CreateGreenCoffeeAsync(coffee);
            return CreatedAtAction(nameof(GetCoffee), new {id = createdCoffee.Id}, createdCoffee);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCoffee(int id, [FromBody] GreenCoffeeUpdateDto coffee)
        {
            if (coffee is null)
                return BadRequest("GreenCoffeeUpdate object is null");

            await _service.GreenCoffeeService.UpdateGreenCoffeeAsync(id, coffee, true);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCoffee(int id)
        {
            await _service.GreenCoffeeService.DeleteGreenCoffeeAsync(id, false);
            return NoContent();
        }
    }
}
