using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Presentation.ActionFilters;
using ServiceContracts;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System.Text.Json;

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
        public async Task<IActionResult> GetRoastings([FromQuery] RoastingsParameters parameters)
        {
            var pagedRoastings = await _service.RoastingsService.GetRoastingsAsync(parameters, false);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagedRoastings.metaData)); // Modify CORS?

            return Ok(pagedRoastings.roastings);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRoasting(int id)
        {
            var roasting = await _service.RoastingsService.GetRoastingAsync(id, false);
            return Ok(roasting);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateRoasting([FromBody] RoastingCreationDto roasting)
        {
            var roastingEntity = await _service.RoastingsService.CreateRoastingAsync(roasting);
            return CreatedAtAction(nameof(GetRoasting), new { id = roastingEntity.Id }, roastingEntity);
        }

        [HttpPut("{id:int}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> UpdateRoasting(int id, [FromBody] RoastingUpdateDto roasting)
        {
            await _service.RoastingsService.UpdateRoastingAsync(id, roasting, true);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult>DeleteRoasting(int id)
        {
            await _service.RoastingsService.DeleteRoastingAsync(id, false);
            return NoContent();
        }
    }
}
