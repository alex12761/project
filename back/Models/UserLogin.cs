using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace pasha.Models;

public class UserLogin
{
    [Required(AllowEmptyStrings = false, ErrorMessage = "Login must be not null")]
    public string UserName { get; set; }
    
    [Required(AllowEmptyStrings = false, ErrorMessage = "Password must be not null")]
    public string Password { get; set; }
}