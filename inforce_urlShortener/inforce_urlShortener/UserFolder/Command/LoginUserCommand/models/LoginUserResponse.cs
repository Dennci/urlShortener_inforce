namespace inforce_urlShortener.UserFolder.Command.LoginUserCommand.models;

public class LoginUserResponse
{
    public string Token { get; set; }

    public LoginUserResponse(string token)
    {
        this.Token = token;
    }
}