using System.ComponentModel.DataAnnotations;

namespace Education.Models {
    public class User {
        public int UserID {get; set;}
        public string Name {get; set;}
        public string Surname {get; set;}
        public string Email {get; set;}
        [Required]
        public int RoleID {get; set;}
        
    }
}