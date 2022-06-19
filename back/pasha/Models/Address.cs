using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pasha.Models;

public class Address
{
    [Required(AllowEmptyStrings = false, ErrorMessage = "User must be not null")]
    [ForeignKey("UserId")]
    public User User { get; set; }
    public int Id { get; set; }
    [Required(AllowEmptyStrings = false, ErrorMessage = "City must be not null")]
    public string City { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Street must be not null")]
    public string Street { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "House must be not null")]
    public string House { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Flat must be not null")]
    public string Flat { get; set; }

    public string Door { get; set; }
    public string Floor { get; set; }
}