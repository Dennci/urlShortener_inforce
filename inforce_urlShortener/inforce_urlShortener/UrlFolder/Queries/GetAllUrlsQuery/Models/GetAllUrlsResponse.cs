using Entity.Models;
using Mapster;

namespace inforce_urlShortener.UrlFolder.Queries.GetAllUrlsQuery.Models;

public class GetAllUrlsResponse
{
    public long Id { get; set; }
    public string UrlPath { get; set; }
    public long UserId { get; set; }
    public string ShortUrl { get; set; }
}
public class GetAllUrlsResponseMapper : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Url, GetAllUrlsResponse>();
    }
}

