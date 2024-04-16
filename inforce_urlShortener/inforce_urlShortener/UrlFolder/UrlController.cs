using inforce_urlShortener.CustomAtribute;
using inforce_urlShortener.Helpers;
using inforce_urlShortener.UrlFolder.Command.CreateShortUrlCommand;
using inforce_urlShortener.UrlFolder.Command.DeleteUrlCommand;
using inforce_urlShortener.UrlFolder.Queries.GetAllUrlsQuery;
using inforce_urlShortener.UrlFolder.Queries.GetOriginalUrlQuery;
using inforce_urlShortener.UrlFolder.Queries.GetUrlById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace inforce_urlShortener.UrlFolder;

public class UrlController:BaseController
{
    public UrlController(IMediator mediator) : base(mediator)
    {
    }
    [HttpGet]
    public async Task<IActionResult> GetAllUrls()
    {
        var response = await _mediator.Send(new GetAllUrlsRequest());
        return ApiResponse(response);
    }
    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUrlById(int id){
        var response = await _mediator.Send(new GetUrlByIdRequest(id));
        return ApiResponse(response);
    }

    [HttpGet("find")]
    public async Task<IActionResult> GetOriginalUrl([FromQuery]GetOriginalUrlRequest request){
        var response = await _mediator.Send(request);
        return ApiResponse(response);
    }
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> AddNewUrl([FromBody]CreateShortUrlRequest request){
        var response = await _mediator.Send(request);
        return ApiResponse(response);
    }
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUrl(int id){
        var response = await _mediator.Send(new DeleteUrlRequest(id));
        return ApiResponse(response);
    }
}