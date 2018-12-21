using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Education.DAL;
using Education.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using System;

namespace Education.Controllers
{
    public class UserController : Controller
    {
        
        private readonly EducationContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ILogger<UserController> _logger;
        public UserController(EducationContext context, UserManager<IdentityUser> userManager) {
            _context = context;
            _userManager = userManager;
        }

       [HttpGet]
        [Route("api/User/GetUsers")]
        public IActionResult GetUsers()
        {
            _logger.LogInformation("Get Users");
            return Ok(new
            {
                users = _userManager.Users
            });
        }

        [HttpGet]
        [Route("api/User/GetUserRoles")]
        public IActionResult GetUserRoles()
        {
            _logger.LogInformation("Get Users Roles");
            return Ok(new
            {
                userRoles = _context.Roles.ToList()
            });
        }

        [HttpDelete]
        [Route("api/User/Delete/{id}")]
        async public Task<IActionResult> Delete([FromRoute] string id)
        {
            var result = await _userManager.DeleteAsync(await _userManager.FindByIdAsync(id));
            if (result != null) 
                return Ok( new {
                    users = _userManager.Users
                });
            else 
                return Error("Unexpected error");
        }

        [HttpPut]
        [Route("api/User/Update")]
        async public Task<IActionResult> Update([FromBody] Credentials credentials) {
            if (!string.IsNullOrEmpty(credentials.Password))
            {
                string hashPass = _userManager.PasswordHasher.HashPassword(credentials.User, credentials.Password);
                credentials.User.PasswordHash = hashPass;
            }
            _context.Entry(credentials.User).State = EntityState.Modified;
            _context.SaveChanges();
            if (string.IsNullOrEmpty(credentials.OldRoleId))
            {
                await _userManager.AddToRoleAsync(credentials.User, _context.Roles.Find(credentials.RoleId).Name);
                return Ok();
            }
            if (!string.IsNullOrEmpty(credentials.RoleId) && !string.IsNullOrEmpty(credentials.OldRoleId))
            {
                await _userManager.RemoveFromRoleAsync(credentials.User, _context.Roles.Find(credentials.OldRoleId).Name);
                await _userManager.AddToRoleAsync(credentials.User, _context.Roles.Find(credentials.RoleId).Name);
            }
            
            return Ok();
        }
 
        private JsonResult Error(string message)
        {
            return new JsonResult(message) { StatusCode = 400 };
        }

    }
}