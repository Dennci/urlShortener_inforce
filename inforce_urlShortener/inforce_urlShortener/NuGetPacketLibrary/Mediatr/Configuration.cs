using inforce_urlShortener.NuGetPacketLibrary.Mediatr.Behavior;
using MediatR;
using MediatR.NotificationPublishers;

namespace inforce_urlShortener.NuGetPacketLibrary.Mediatr
{
    public static class Configuration
    {
        public static IServiceCollection AddMediatrConfig(this IServiceCollection services)
        {
            services.AddMediatR(option =>
            {
                option.NotificationPublisher = new TaskWhenAllPublisher();
                option.NotificationPublisherType = typeof(TaskWhenAllPublisher);
                option.RegisterServicesFromAssemblyContaining<Program>();
            });
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ExceptionHandlerBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(TransactionBehavior<,>));

            return services;
        }
    }
}