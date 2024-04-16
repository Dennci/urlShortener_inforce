using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UrlFolder.Queries.GetUrlById.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UrlFolder.Queries.GetUrlById;

public record GetUrlByIdRequest(int Id) : IRequest<Response<GetUrlByIdResponse>>;

public class GetUrlByIdQueryHandler : IRequestHandler<GetUrlByIdRequest, Response<GetUrlByIdResponse>>
{
    private readonly ApplicationDbContext _applicationDbContext;

    public GetUrlByIdQueryHandler(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<Response<GetUrlByIdResponse>> Handle(GetUrlByIdRequest request,
        CancellationToken cancellationToken)
    {
        var detailedUrl = await _applicationDbContext.Urls
            .Where(x=>x.Id==request.Id)
            .ProjectToType<GetUrlByIdResponse>()
            .FirstOrDefaultAsync();

        if (detailedUrl == null)
        {
            return FailureResponses.NotFound<GetUrlByIdResponse>("Url was not found");
        }
        return SuccessResponses.Ok(detailedUrl);
    }
}