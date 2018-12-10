using System.ComponentModel.DataAnnotations;

namespace Education.Models {
    public class User {
        public int UserID {get; set;}
        public string Name {get; set;}
        public string Surname {get; set;}
        public string email {get; set;}
        [Required]
        public int RoleID {get; set;}
        
    }
}