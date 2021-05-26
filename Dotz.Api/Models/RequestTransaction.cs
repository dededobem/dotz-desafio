using Dotz.Domain.Enums;
using System.Text.Json.Serialization;

namespace Dotz.Api.Models
{
    public class RequestTransaction
    {        
        [JsonIgnore]
        public string CustomerId { get; set; }        
        public OperationType OperationType { get; set; }
        public string LocalType { get; set; }
        public string Details { get; set; }
        public double Dz { get; set; }
    }
}
