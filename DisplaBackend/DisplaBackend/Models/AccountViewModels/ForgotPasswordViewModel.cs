using System.ComponentModel.DataAnnotations;

namespace DisplaBackend.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
