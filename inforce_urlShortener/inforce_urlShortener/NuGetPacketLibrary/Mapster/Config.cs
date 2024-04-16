using System.Reflection;
using Mapster;
using MapsterMapper;

namespace inforce_urlShortener.NuGetPacketLibrary.Mapster;

public static class Config
{
    public static IServiceCollection AddMapsterConfig(this IServiceCollection services)
    {
        var config = TypeAdapterConfig.GlobalSettings;
        services.AddSingleton(config);
        services.AddScoped<IMapper,ServiceMapper>();
        config.Scan(Assembly.GetExecutingAssembly());
        return services;
    }
}