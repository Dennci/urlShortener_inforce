using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace inforce_urlShortener.Helpers;

[ApiController]
[Route("api/[controller]")]
public class BaseController : ControllerBase
{
    protected readonly IMediator _mediator;
    public BaseController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [NonAction]
    public IActionResult ApiResponse<T>(Response<T> response) =>
        response.StatusCode switch
        {
            HttpStatusCode.OK => Ok(response.Value),
            HttpStatusCode.Created => Created("", response.Value),
            HttpStatusCode.NoContent => NoContent(),
            HttpStatusCode.NotFound => NotFound(response),
            HttpStatusCode.BadRequest => BadRequest(response),
            HttpStatusCode.Unauthorized => Unauthorized(response),
            _ => StatusCode((int)response.StatusCode,response)
        };
}