using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UrlFolder.Queries.GetAllUrlsQuery.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UrlFolder.Queries.GetAllUrlsQuery;

public record GetAllUrlsRequest() : IRequest<Response<List<GetAllUrlsResponse>>>;

public class GetAllUrlsQueryHandler : IRequestHandler<GetAllUrlsRequest, Response<List<GetAllUrlsResponse>>>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public GetAllUrlsQueryHandler(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response<List<GetAllUrlsResponse>>> Handle(GetAllUrlsRequest request,
        CancellationToken cancellationToken)
    {
        var allUrl = await _applicationDbContext.Urls
            .ProjectToType<GetAllUrlsResponse>()
            .ToListAsync();

        return SuccessResponses.Ok(allUrl);
    }
}