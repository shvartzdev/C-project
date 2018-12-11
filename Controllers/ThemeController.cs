using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Models.Users;
using Education.DAL;
using Microsoft.AspNetCore.Mvc;
using Education.Models;
using Education.Models.Themes;

namespace Education.Controllers
{
    public class ThemeController : Controller
    {
        private readonly EducationContext _context;
        private ThemeRepositoryImpl themeRepositoryImpl;
        public ThemeController(EducationContext context) {
            _context = context;
            themeRepositoryImpl = new ThemeRepositoryImpl(_context);
        }

        [HttpGet]
        [Route("api/theme/getall")]
        public ActionResult GetAll() {
            return Ok(new {
                themes = themeRepositoryImpl.getAll()
            });
        }

        [HttpPost]
        [Route("api/theme/create")]
        public Theme create([FromBody]Theme theme) {
            return themeRepositoryImpl.Create(theme);
        }

        [HttpPut]
        [Route("api/theme/edit/{id}")]
        public Theme Edit([FromBody]Theme theme) {
            return themeRepositoryImpl.Update(theme);
        }

        [HttpDelete]
        [Route("api/theme/delete/{id}")]
        public int Delete(int id) {
            return themeRepositoryImpl.Delete(id);
        }


    }
}