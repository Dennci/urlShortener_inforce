using MediatR;


namespace inforce_urlShortener.NuGetPacketLibrary.Mediatr
{
    public interface ICommandHandler<in TCommand, TResponse> : IRequestHandler<TCommand, TResponse>
            where TCommand : ICommand<TResponse>
    {
    }
}