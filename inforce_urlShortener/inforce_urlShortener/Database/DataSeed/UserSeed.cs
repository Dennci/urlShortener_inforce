using Entity.Models;

namespace inforce_urlShortener.Database.DataSeed;

public class UserSeed
{
    public static IEnumerable<User> Data()
    {
        List<User> data = new()
        {
            new User()
            {
                Id = 1,
                UserEmail = "politechden9@gmail.com",
                Password = "$2a$12$PiJiguQi//rC8NcQOP5fOepwijsvno7ruzXR7YaSFRQegYAGXpTAm",
                Role = UserRole.Admin
            }
        };
        return data;
    }
}