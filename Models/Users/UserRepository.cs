using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Education.Models;
using Microsoft.AspNetCore.Mvc;


namespace Education.Models.Users
{
    public interface UserRepository : IDisposable {
        List<User> getAllUsers();
        User GetUser(int id);
        User Create(User user);
        int Update(User user);
        int Delete(int id);
    }
}