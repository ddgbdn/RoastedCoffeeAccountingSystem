﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public IActionResult CreateRoasting([FromBody] RoastingCreationDto roasting)
        {
            if (roasting is null)
                return BadRequest("RoastingCreation object is null");

            var roastingEntity = _service.RoastingsService.CreateRoasting(roasting);
            return CreatedAtAction(nameof(GetRoasting), new { id = roastingEntity.Id }, roastingEntity);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateRoasting(int id, [FromBody] RoastingUpdateDto roasting)
        {
            if (roasting is null)
                return BadRequest("RoastingUpdate object is null");

            _service.RoastingsService.UpdateRoasting(id, roasting, true);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteRoasting(int id)
        {
            _service.RoastingsService.DeleteRoasting(id, false);
            return NoContent();
        }
    }
}
