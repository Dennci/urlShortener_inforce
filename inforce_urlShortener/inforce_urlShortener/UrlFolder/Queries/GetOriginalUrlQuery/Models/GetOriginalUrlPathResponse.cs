namespace inforce_urlShortener.UrlFolder.Queries.GetOriginalUrlQuery.Models;

public class GetOriginalUrlPathResponse
{
    public string OriginalUrl { get; set; }

    public GetOriginalUrlPathResponse(string url)
    {
        this.OriginalUrl = url;
    }
}