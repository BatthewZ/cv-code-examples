using Assignment2.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Assignment2.Filters;

public class AuthorizeUserAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var customerID = context.HttpContext.Session.GetInt32(nameof(CustomerModel.ID));
        if (!customerID.HasValue)
            context.Result = new RedirectToActionResult("Index", "Home", null);
    }
}

