using System.ComponentModel.DataAnnotations;

namespace pasha.Models;

public class Dish
{
    public int Id { get; set; }
    [Required(AllowEmptyStrings = false, ErrorMessage = "Title must be not null")]
    public string Title { get; set; }
    public string Description { get; set; }
    public double Rating { get; set; }
    public string Category { get; set; }
    public byte[] Image { get; set; }
    [Required(AllowEmptyStrings = false, ErrorMessage = "Price must be not null")]
    public double Price { get; set; }
}