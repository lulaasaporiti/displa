using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DisplaBackend.Models;
using Microsoft.AspNetCore.Identity;

namespace DisplaBackend.Helpers
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser<int>
    {
        //public static explicit operator ApplicationUser(AspNetUsers v)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
