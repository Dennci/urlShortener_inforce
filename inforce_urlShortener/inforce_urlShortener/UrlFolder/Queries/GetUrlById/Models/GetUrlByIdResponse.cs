using Entity.Models;
using Mapster;

namespace inforce_urlShortener.UrlFolder.Queries.GetUrlById.Models;

public class GetUrlByIdResponse
{
    public int Id { get; set; }
    public string UrlPath { get; set; }
    public string ShortUrl { get; set; }
    public string CodedPart { get; set; }
    public string UserEmail { get; set; }
    public DateTime CreatedDate { get; set; }
}
public class GetUrlByIdResponseMapper : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Url, GetUrlByIdResponse>()
            .Map(dst => dst.CodedPart, src => src.СodedPath)
            .Map(dst => dst.UserEmail, src => src.User.UserEmail);
    }
}