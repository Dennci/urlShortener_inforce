using Entity.Models;
using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UserFolder.UserServiceFolder;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UrlFolder.Command.DeleteUrlCommand;

public record DeleteUrlRequest(
    long Id
): IRequest<Response<EmptyValue>>;

public class DeleteUrlCommandHandler : IRequestHandler<DeleteUrlRequest, Response<EmptyValue>>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly UserService _userService;

    public DeleteUrlCommandHandler(ApplicationDbContext applicationDbContext, UserService userService)
    {
        _applicationDbContext = applicationDbContext;
        _userService = userService;
    }
   
    public async Task<Response<EmptyValue>> Handle(DeleteUrlRequest request, CancellationToken cancellationToken)
    {
        var currentUserRole = _userService.GetCurrentUserRole();
        var currentUserId = _userService.GetCurrentUserId();
        var url = await _applicationDbContext.Urls.FirstAsync(x => x.Id == request.Id);
        if (url == null)
        {
            return FailureResponses.NotFound("Url was not found");
        }

        if (!(url.UserId == currentUserId || currentUserRole == UserRole.Admin))
        {
            return FailureResponses.BadRequest("You do not have the authority to remove the url");
        }
        _applicationDbContext.Urls.Remove(url);
        await _applicationDbContext.SaveChangesAsync();
        return SuccessResponses.Ok();
    }
}