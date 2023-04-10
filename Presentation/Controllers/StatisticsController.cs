using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public StatisticsController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet("roastings")]
        [Authorize(Roles = "Viewer")]
        public async Task<IActionResult> GetRoastingStatisctics([FromQuery]DateTime date)
        {
            var stats =  await _serviceManager.RoastingsService.GetRoastingStatsAsync(date);
            return Ok(stats);
        }

        [HttpGet("greencoffee")]
        [Authorize(Roles = "Viewer")]
        public async Task<IActionResult> GetGreenCoffeeStatisctics([FromQuery] DateTime date)
        {
            var stats = await _serviceManager.GreenCoffeeService.GetGreenCoffeeStatsAsync();
            return Ok(stats);
        }
    }
}
