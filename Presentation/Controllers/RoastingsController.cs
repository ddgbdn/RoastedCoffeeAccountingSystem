using Microsoft.AspNetCore.Mvc;
using ServiceContracts;

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
    }
}
