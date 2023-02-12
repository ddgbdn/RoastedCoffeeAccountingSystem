﻿using Microsoft.AspNetCore.Mvc;
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
        public IActionResult GetCoffee()
        {
            try
            {
                var coffee = _service.GreenCoffeeService.GetAllGreenCoffee(false);
                return Ok(coffee);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
