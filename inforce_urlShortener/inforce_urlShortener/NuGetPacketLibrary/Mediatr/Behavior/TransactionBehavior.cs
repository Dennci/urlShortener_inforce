using inforce_urlShortener.Database;
using MediatR;

namespace inforce_urlShortener.NuGetPacketLibrary.Mediatr.Behavior
{
    public sealed class TransactionBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
         private readonly ApplicationDbContext _applicationDbContext;

         public TransactionBehavior(ApplicationDbContext applicationDbContext)
         {
             _applicationDbContext = applicationDbContext;
         }

         public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var transaction =await _applicationDbContext.Database.BeginTransactionAsync();

            try
            {
                var response = await next();
                await transaction.CommitAsync();
                return response;
            }
            catch (ArgumentException e)
            {
                await transaction.RollbackAsync();
            }
            return default(TResponse);
        }
    }
}