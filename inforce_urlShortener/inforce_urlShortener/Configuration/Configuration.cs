using inforce_urlShortener.Database;
using inforce_urlShortener.NuGetPacketLibrary;
using inforce_urlShortener.UserFolder.UserServiceFolder;

namespace inforce_urlShortener.Configuration;

public static class Configuration
{
    public static IServiceCollection AddConfiguration(this IServiceCollection services
        , WebApplicationBuilder builder)
    {
        var configuration = builder.Configuration;
        services.AddDataBaseConfig(configuration);
        services.AddCorsConfig();
        services.AddScoped<UserService>();
        services.AddHttpContextAccessor();
        services.AddNugetPackagesConfig();
        services.AddAuthConfig(configuration);
        services.AddEndpointsApiExplorer();
        services.AddSwaggerConfig();
        return services;
    }
}