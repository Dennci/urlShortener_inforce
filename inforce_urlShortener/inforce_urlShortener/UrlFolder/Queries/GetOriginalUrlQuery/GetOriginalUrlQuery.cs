using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UrlFolder.Queries.GetAllUrlsQuery;
using inforce_urlShortener.UrlFolder.Queries.GetAllUrlsQuery.Models;
using inforce_urlShortener.UrlFolder.Queries.GetOriginalUrlQuery.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UrlFolder.Queries.GetOriginalUrlQuery;

public record GetOriginalUrlRequest(
    string ShortUrl
    ) : IRequest<Response<GetOriginalUrlPathResponse>>;

public class GetOriginalQueryHandler : IRequestHandler<GetOriginalUrlRequest, Response<GetOriginalUrlPathResponse>>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public GetOriginalQueryHandler(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response<GetOriginalUrlPathResponse>> Handle(GetOriginalUrlRequest request,
        CancellationToken cancellationToken)
    {
        var urlModel = await _applicationDbContext.Urls.FirstOrDefaultAsync(x => x.ShortUrl == request.ShortUrl);

        return SuccessResponses.Ok(new GetOriginalUrlPathResponse(urlModel.UrlPath));
    }
}