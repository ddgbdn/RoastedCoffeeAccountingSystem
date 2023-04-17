using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using ServiceContracts;
using Shared.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly IServiceManager _service;

        public TokenController(IServiceManager service)
        {
            _service = service;
        }
                       
        [HttpPost("refresh")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Refresh([FromBody] TokenDto tokenDto)
        {
            return Ok(await _service.AuthenticationService.RefreshToken(tokenDto));
        }

        [HttpPost("logout")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Forget([FromBody] TokenDto tokenDto)
        {
            await _service.AuthenticationService.DeleteToken(tokenDto);
            return Ok();
        }
    }
}
