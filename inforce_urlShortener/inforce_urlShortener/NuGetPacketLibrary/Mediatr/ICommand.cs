using MediatR;

namespace inforce_urlShortener.NuGetPacketLibrary.Mediatr
{
    public interface ICommand<TResponse> : IRequest<TResponse>
    {
    }
}