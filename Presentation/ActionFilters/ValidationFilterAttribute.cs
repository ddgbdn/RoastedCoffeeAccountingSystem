using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.ActionFilters
{
    public class ValidationFilterAttribute : IActionFilter
    {
        public ValidationFilterAttribute() 
        {
        }
                
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var parameter = context.ActionArguments.SingleOrDefault(kv => kv.Value.ToString().Contains("Dto")).Value;

            if (parameter is null) 
            {
                context.Result = new BadRequestObjectResult(
                    $"Object is null. " +
                    $"Controller: {context.RouteData.Values["controller"]}, " +
                    $"Action: {context.RouteData.Values["action"]}");
                return;
            }

            if (!context.ModelState.IsValid) 
                context.Result = new UnprocessableEntityObjectResult(context.ModelState);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}
