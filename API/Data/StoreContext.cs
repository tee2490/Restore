using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
        
    public class StoreContext : IdentityDbContext<User> //เปลืี่ยนการสืบทอดเป็น Identity
    {
        public StoreContext(DbContextOptions options) :base(options)
        {
            
        }

        public DbSet<Product> Products {get; set;}
        public DbSet<Basket> Baskets {get; set;}
        public DbSet<BasketItem> BasketItems {get; set;}

        //สร้างข้อมูลเริ่มต้นให้กับ Role
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Name="Member",NormalizedName="MEMBER"},
                new IdentityRole {Name="Admin",NormalizedName="ADMIN"}
            );
        }
        
    }
}