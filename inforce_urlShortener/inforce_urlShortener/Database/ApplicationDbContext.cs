using Entity.Models;
using inforce_urlShortener.Database.DataSeed;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace inforce_urlShortener.Database;

public class ApplicationDbContext:DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Url> Urls { get; set; }
    private readonly IMediator _mediator;
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IMediator mediator)
        : base(options)
    {
        _mediator = mediator;
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(UserSeed.Data());
    }
}