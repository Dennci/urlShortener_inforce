using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace inforce_urlShortener
{
    public class AuthOptions
    {
        public const string ISSUER = "ISSUER"; 
        public const string AUDIENCE = "AUDIENCE"; 
        const string KEY = "or{O>pc+Cg>QBPDzLSCfv(gR5{(g=nT^";   
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new(Encoding.UTF8.GetBytes(KEY));
    }
}
