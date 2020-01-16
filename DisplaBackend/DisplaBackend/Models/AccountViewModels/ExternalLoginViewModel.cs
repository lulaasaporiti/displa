using System.ComponentModel.DataAnnotations;

namespace DisplaBackend.Models.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
