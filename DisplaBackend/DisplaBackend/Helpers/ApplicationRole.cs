using Microsoft.AspNetCore.Identity;

namespace DisplaBackend.Helpers
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationRole : IdentityRole<int>
    {
        public ApplicationRole() : base()
        {

        }
        public ApplicationRole(string name)
         : this()
        {
            System.Random rnd = new System.Random();
            //Id = rnd.Next(-95454, -1);
            Name = name;
        }
    }
}
