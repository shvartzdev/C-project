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
using Microsoft.AspNetCore.Identity;

namespace Education.Controllers
{
    public class RoleController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly EducationContext _context;
        public RoleController(EducationContext context, RoleManager<IdentityRole> roleManager) {
            _roleManager = roleManager;
            _context = context;
        }

        [HttpGet]
        [Route("api/Role/GetRoles")]
        public IActionResult GetRoles()
        {
            return Ok(new
            {
                roles = _roleManager.Roles.ToList()
            });
        }

        [HttpPost]
        [Route("api/Role/Create")]
        public async Task<IActionResult> Create([FromBody] string roleName)
        {
            if (!string.IsNullOrEmpty(roleName))
            {
                IdentityResult result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                if (result.Succeeded)
                {
                    return Ok( new {
                        roles = _roleManager.Roles.ToList()
                    });
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
            }
            return Ok();
        }

        [HttpDelete]
        [Route("api/Role/Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute]string id)
        {
            IdentityRole role = await _roleManager.FindByIdAsync(id);
            if (role != null)
            {
                IdentityResult result = await _roleManager.DeleteAsync(role);
            }
            return Ok(new {
                roles = _roleManager.Roles.ToList()
            });
        }


    }
}