using Microsoft.AspNetCore.Mvc;
using ServiceContracts;
using Shared.DataTransferObjects;

namespace RoastedCoffeeAccountingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoastingsController : ControllerBase
    {
        private readonly IServiceManager _service;

        public RoastingsController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetRoastings()
        {
            var roastings = _service.RoastingsService.GetRoastings(false);
            return Ok(roastings);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetRoasting(int id)
        {
            var roasting = _service.RoastingsService.GetRoasting(id, false);
            return Ok(roasting);
        }

        public IActionResult CreateRoasting([FromBody] RoastingCreationDto roasting)
        {
            if (roasting == null)
                return BadRequest("RoastingCreation object is null");

            var roastingEntity = _service.RoastingsService.CreateRoasting(roasting);
            return CreatedAtAction(nameof(GetRoasting), new { id = roastingEntity.Id }, roastingEntity);
        }
    }
}
