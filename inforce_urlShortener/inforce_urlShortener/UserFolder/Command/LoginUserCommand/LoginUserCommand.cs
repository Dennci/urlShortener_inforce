using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UserFolder.Command.LoginUserCommand.models;
using inforce_urlShortener.UserFolder.Helpers;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UserFolder.Command.LoginUserCommand;

public record LoginUserCommandRequest(
    string UserEmail,
    string Password
): IRequest<Response<LoginUserResponse>>;

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, Response<LoginUserResponse>>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly IConfiguration _configuration;
    private readonly TokenHelpers _tokenHelpers;

    public LoginUserCommandHandler(ApplicationDbContext applicationDbContext, IConfiguration configuration, TokenHelpers tokenHelpers)
    {
        _applicationDbContext = applicationDbContext;
        _configuration = configuration;
        _tokenHelpers = tokenHelpers;
    }

    public async Task<Response<LoginUserResponse>> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
    {
        var user = await _applicationDbContext.Users.FirstOrDefaultAsync(item => item.UserEmail == request.UserEmail);

        if(user == null)
        {
            return FailureResponses.BadRequest<LoginUserResponse>("Invalid user email or password");
        }

        if(!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
        {
            return FailureResponses.BadRequest<LoginUserResponse>("Invalid  password");
        }

        string token = _tokenHelpers.GenerateToken(user,_configuration);

        return SuccessResponses.Ok(new LoginUserResponse(token));
    }
}