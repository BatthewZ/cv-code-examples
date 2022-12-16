using Assignment2.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AdminPortal.Filters;

public class AuthorizeUserAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var adminID = context.HttpContext.Session.GetInt32("ID");
        if (!adminID.HasValue)
            context.Result = new RedirectToActionResult("Index", "AdminHome", null);
    }
}

