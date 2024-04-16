using inforce_urlShortener.Helpers;
using MediatR;

namespace inforce_urlShortener.NuGetPacketLibrary.Mediatr.Behavior
{
    public sealed class ExceptionHandlerBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
            where TRequest : IRequest<TResponse>
            where TResponse:Response
    {

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            try
            {
                return await next();
            }
            catch (ArgumentException e)
            {
                return FailureResponses.BadRequestResponse<TResponse>(e.Message);
            }
        }
    }
}