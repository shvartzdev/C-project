using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Models.Users;
using Education.DAL;
using Microsoft.AspNetCore.Mvc;
using Education.Models;

namespace Education.Controllers
{
    public class UserController : Controller
    {
        private readonly EducationContext _context;
        private UserRepositoryImpl userRepositoryImpl;
        public UserController(EducationContext context) {
            _context = context;
            userRepositoryImpl = new UserRepositoryImpl(_context);
        }

        [HttpGet]
        [Route("api/user/getall")]
        public ActionResult GetAll() {
            return Ok(new {
                users = userRepositoryImpl.getAllUsers()
            });
        }

        [HttpPost]
        [Route("api/user/create")]
        public int create([FromBody] User user) {
            return userRepositoryImpl.Create(user);
        }

        [HttpGet]
        [Route("api/user/details/{id}")]
        public User details(int id) {
            return userRepositoryImpl.GetUser(id);
        }

        [HttpPut]
        [Route("api/user/edit")]
        public int Edit(User user) {
            return userRepositoryImpl.Update(user);
        }

        [HttpDelete]
        [Route("api/user/delete/{id}")]
        public int Delete(int id) {
            return userRepositoryImpl.Delete(id);
        }

    }
}