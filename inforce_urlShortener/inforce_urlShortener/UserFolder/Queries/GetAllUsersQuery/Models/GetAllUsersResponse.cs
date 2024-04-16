using Entity.Models;
using Mapster;

namespace inforce_urlShortener.UserFolder.Queries.GetAllUsersQuery.Models;

public class GetAllUsersResponse
{
    public long Id { get; set; }
    public string UserEmail { get; set; } 
    public UserRole Role { get; set; } 
}
public class GetAllUsersResponseMapper : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<User, GetAllUsersResponse>();
    }
}