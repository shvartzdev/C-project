using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Models.Users;
using Education.DAL;
using Microsoft.AspNetCore.Mvc;
using Education.Models;
using Education.Models.Themes;
using Education.Models.Roles;

namespace Education.Controllers
{
    public class RoleController : Controller
    {
        private readonly EducationContext _context; 
        private RoleRepositoryImpl roleRepositoryImpl;
        public RoleController(EducationContext context) {
            _context = context;
            roleRepositoryImpl = new RoleRepositoryImpl(_context);
        }

        [HttpGet]
        [Route("api/role/getall")]
        public ActionResult GetAll() {
            return Ok(new {
                roles = roleRepositoryImpl.getAll()
            });
        }

        [HttpPost]
        [Route("api/role/create")]
        public Role create([FromBody]Role role) {
            return roleRepositoryImpl.Create(role);
        }

         [HttpGet]
        [Route("api/role/details/{id}")]
        public Role details(int id) {
            return roleRepositoryImpl.Get(id);
        }

         [HttpPut]
        [Route("api/role/edit/{id}")]
        public Role Edit([FromBody]Role role) {
            return roleRepositoryImpl.Update(role);
        }

        [HttpDelete]
        [Route("api/role/delete/{id}")]
        public int Delete(int id) {
            return roleRepositoryImpl.Delete(id);
        }
    }
}