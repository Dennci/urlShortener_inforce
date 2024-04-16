using Entity.Models;

namespace inforce_urlShortener.UserFolder.UserServiceFolder;

public class UserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    public long GetCurrentUserId()
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst("Id")?.Value;
        return long.TryParse(userId, out long id) ? id : 0;
    }
    public UserRole GetCurrentUserRole()
    {
        var role = _httpContextAccessor.HttpContext?.User?.FindFirst("UserRole")?.Value;
        
        if (Enum.TryParse(role, out UserRole userRole))
        {
            return userRole;
        }
        else
        {
            return UserRole.User;
        }
    }
}