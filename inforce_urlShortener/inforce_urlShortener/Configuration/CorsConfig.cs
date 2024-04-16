namespace inforce_urlShortener.Configuration;

public static class CorsConfig
{
    public static string CorsKey="CorsPolicy";
    public static IServiceCollection AddCorsConfig(this IServiceCollection services)
    {
        services.AddCors(x=>x.AddPolicy(CorsKey, policy =>
        {
            policy
                .WithOrigins("https://localhost:3000","http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }));

        return services;
    }

    public static void UseAppCors(this IApplicationBuilder app)
    {
        app.UseCors(CorsKey);
    }
}