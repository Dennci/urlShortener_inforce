using System;

namespace Entity.Models;

public class Url:BaseEntity
{
    public string UrlPath { get; set; }
    public string ShortUrl { get; set; } 
    public string СodedPath { get; set; } 
    public long UserId { get; set; }
    public User User { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}