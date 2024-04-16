using Entity.Models;
using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UserFolder.Command.RegisterUserCommand;
public record RegisterUserCommandRequest(
    string UserEmail,
    string Password,
    UserRole Role
): IRequest<Response<EmptyValue>>;

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommandRequest, Response<EmptyValue>>
{
    private readonly ApplicationDbContext _applicationDbContext;


    public RegisterUserCommandHandler(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }
    
    public async Task<Response<EmptyValue>> Handle(RegisterUserCommandRequest request, CancellationToken cancellationToken)
    {
        var checkUser = await _applicationDbContext.Users.FirstOrDefaultAsync(item => item.UserEmail == request.UserEmail);

        if (checkUser != null)
            return FailureResponses.BadRequest("User is already exist");

        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        User user = new User()
        {
            UserEmail = request.UserEmail,
            Password = passwordHash,
            Role = request.Role
        };

        await _applicationDbContext.Users.AddAsync(user);
        await _applicationDbContext.SaveChangesAsync();
        return SuccessResponses.Ok();
    }
}