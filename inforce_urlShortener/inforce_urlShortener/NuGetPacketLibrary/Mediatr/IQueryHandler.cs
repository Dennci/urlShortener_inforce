using inforce_urlShortener.Helpers;
using MediatR;

namespace inforce_urlShortener.NuGetPacketLibrary.Mediatr
{
    public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, Response<TResponse>>
            where TQuery : IQuery<TResponse>
    {
    }
}