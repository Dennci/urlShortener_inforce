using Entity.Models;
using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UserFolder.Command.RaiseUserToAdminCommand;

public record RaiseUserToAdminCommandRequest(
    long UserId
): IRequest<Response<EmptyValue>>;

public class RaiseUserToAdminCommandHandler : IRequestHandler<RaiseUserToAdminCommandRequest, Response<EmptyValue>>
{
    private readonly ApplicationDbContext _applicationDbContext;
    
    public RaiseUserToAdminCommandHandler(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
 
    }

    public async Task<Response<EmptyValue>> Handle(RaiseUserToAdminCommandRequest request, CancellationToken cancellationToken)
    {
        var user = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.Id == request.UserId);
        if (user == null)
        {
            return FailureResponses.BadRequest("User was not found");
        }
        user.Role = UserRole.Admin;
        _applicationDbContext.Users.Update(user);
        await _applicationDbContext.SaveChangesAsync();
        return SuccessResponses.Ok();
    }
}