using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.ActionFilters
{
    public class ValidateMediaTypeAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var acceptHeaderPresented = context.HttpContext.Request.Headers;
        }

        public void OnActionExecuted(ActionExecutedContext context) 
        {
        }
    }
}
