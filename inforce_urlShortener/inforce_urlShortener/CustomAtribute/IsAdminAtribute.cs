using Entity.Models;
using inforce_urlShortener.UserFolder.UserServiceFolder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace inforce_urlShortener.CustomAtribute;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
public class IsAdminAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.User.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var userService = context.HttpContext.RequestServices.GetService<UserService>();
        var currentUserRole = userService.GetCurrentUserRole();
        if (!(currentUserRole == UserRole.Admin))
        {
            context.Result = new ForbidResult();
            return;
        }
    }
}