namespace Entity.Models;

public class User:BaseEntity
{
    public string UserEmail { get; set; } 
    public string Password { get; set; } 
    public UserRole Role { get; set; } 
}
public enum UserRole
{
    User = 0,
    Admin = 100
}