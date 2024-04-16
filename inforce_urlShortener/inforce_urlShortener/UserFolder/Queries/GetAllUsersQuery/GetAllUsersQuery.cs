using Entity.Models;
using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UserFolder.Queries.GetAllUsersQuery.Models;
using inforce_urlShortener.UserFolder.UserServiceFolder;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UserFolder.Queries.GetAllUsersQuery;

public record GetAllUsersRequest() : IRequest<Response<List<GetAllUsersResponse>>>;

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersRequest, Response<List<GetAllUsersResponse>>>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly UserService _userService;

    public GetAllUsersQueryHandler(ApplicationDbContext applicationDbContext, UserService userService)
    {
        _applicationDbContext = applicationDbContext;
        _userService = userService;
    }

    public async Task<Response<List<GetAllUsersResponse>>> Handle(GetAllUsersRequest request,
        CancellationToken cancellationToken)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var allUsers = await _applicationDbContext.Users
            .Where(x=>x.Id!=currentUserId&&x.Role!=UserRole.Admin)
            .ProjectToType<GetAllUsersResponse>()
            .ToListAsync();

        return SuccessResponses.Ok(allUsers);
    }
}