using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.Database;

public static class Configuration
{
    public static IServiceCollection AddDataBaseConfig(this IServiceCollection services
        ,IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")).UseSnakeCaseNamingConvention());
        return services;
    }
}