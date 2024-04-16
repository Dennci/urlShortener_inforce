using System.Security.Cryptography;
using System.Text;
using Entity.Models;
using inforce_urlShortener.Database;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UserFolder.UserServiceFolder;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.UrlFolder.Command.CreateShortUrlCommand;

public record CreateShortUrlRequest(
    string UrlPath
): IRequest<Response<EmptyValue>>;

public class CreateShortUrlCommandHandler : IRequestHandler<CreateShortUrlRequest, Response<EmptyValue>>
{
    private readonly ApplicationDbContext _applicationDbContext;
    private readonly UserService _userService;

    public CreateShortUrlCommandHandler(ApplicationDbContext applicationDbContext, UserService userService)
    {
        _applicationDbContext = applicationDbContext;
        _userService = userService;
    }
    private (string shortened, string full) MakeShortUrl(string originalUrl)
    {
        using SHA256 sha256 = SHA256.Create();
        byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(originalUrl));
        StringBuilder sb = new StringBuilder();

        foreach (byte b in hashBytes)
        {
            sb.Append(b.ToString("X2"));
        }

        string hash = sb.ToString();

        string shortenedPart = hash.Substring(0, 8);

        var result = (
            shortened: shortenedPart,
            full: $"https://short.url/{shortenedPart}"
        );

        return result;
    }
    public async Task<Response<EmptyValue>> Handle(CreateShortUrlRequest request, CancellationToken cancellationToken)
    {
        if (await _applicationDbContext.Urls.FirstOrDefaultAsync(x => x.UrlPath == request.UrlPath) != null)
        {
            return FailureResponses.BadRequest("Url is already exists");
        }
        var shortenedUrl = MakeShortUrl(request.UrlPath);
        var currentUserId = _userService.GetCurrentUserId();
        var model = new Url
        {
            UrlPath = request.UrlPath,
            ShortUrl = shortenedUrl.full,
            СodedPath = shortenedUrl.shortened,
            UserId = currentUserId,
            CreatedDate = DateTime.UtcNow
        };
        
        if (await _applicationDbContext.Urls.FirstOrDefaultAsync(x => x.ShortUrl == model.ShortUrl) != null)
        {
            return FailureResponses.BadRequest("This shortened URL is already exists");
        }
        
        await _applicationDbContext.Urls.AddAsync(model);
        await _applicationDbContext.SaveChangesAsync();
        return SuccessResponses.Ok();
    }
}