using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Entity.Models;
using Microsoft.IdentityModel.Tokens;

namespace inforce_urlShortener.UserFolder.Helpers;

public  class TokenHelpers
{
    public  string GenerateToken(User user, IConfiguration configuration)
    {
        List<Claim> claims = new List<Claim> { 
            new Claim("Id", user.Id.ToString()),
            new Claim("UserEmail", user.UserEmail),
            new Claim("UserRole", user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value!));
        
        var token = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}