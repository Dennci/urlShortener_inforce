using inforce_urlShortener.Helpers;
using MediatR;

namespace inforce_urlShortener.NuGetPacketLibrary.Mediatr
{
    public interface IQuery<TResponse> :  IRequest<Response<TResponse>>
    {
    }
}