using System.ComponentModel.DataAnnotations;

namespace Dotz.Api.Models
{
    public class RequestDotz
    {
        [Required]
        public double Value { get; set; }
    }
}
