using inforce_urlShortener.NuGetPacketLibrary.Mapster;
using inforce_urlShortener.NuGetPacketLibrary.Mediatr;

namespace inforce_urlShortener.NuGetPacketLibrary;

public static class Configuration
{
    public static IServiceCollection AddNugetPackagesConfig(this IServiceCollection services)
    {
        services.AddMediatrConfig();
        services.AddMapsterConfig();

        return services;
    }
}