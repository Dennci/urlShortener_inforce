using inforce_urlShortener.CustomAtribute;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UserFolder.Command.LoginUserCommand;
using inforce_urlShortener.UserFolder.Command.RaiseUserToAdminCommand;
using inforce_urlShortener.UserFolder.Command.RegisterUserCommand;
using inforce_urlShortener.UserFolder.Queries.GetAllUsersQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace inforce_urlShortener.UserFolder;

public class UserController:BaseController
{
    public UserController(IMediator mediator) : base(mediator)
    {
    }
     [HttpPost("register")]
     public async Task<IActionResult> Register([FromBody]RegisterUserCommandRequest request)
     {
         var response = await _mediator.Send(request);
         return ApiResponse(response);
     }
     [HttpPost("login")]
     public async Task<IActionResult> Login([FromBody]LoginUserCommandRequest request)
     {
         var response = await _mediator.Send(request);
         return ApiResponse(response);
     }
     [HttpGet]
     public async Task<IActionResult> GetAllUsers()
     {
         var response = await _mediator.Send(new GetAllUsersRequest());
         return ApiResponse(response);
     }
     [IsAdmin]
     [HttpPost("raise-to-admin")]
     public async Task<IActionResult> RaiseUserToAdmin([FromBody]RaiseUserToAdminCommandRequest request)
     {
         var response = await _mediator.Send(request);
         return ApiResponse(response);
     }
}