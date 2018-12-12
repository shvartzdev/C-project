using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Models.Users;
using Education.DAL;
using Microsoft.AspNetCore.Mvc;
using Education.Models;
using Education.Models.Themes;
using Education.Models.Tasks;

namespace Education.Controllers
{
    public class TaskController : Controller
    {
        private readonly EducationContext _context;
        private TaskRepositoryImpl taskRepositoryImpl;
        public TaskController(EducationContext context) {
            _context = context;
            taskRepositoryImpl = new TaskRepositoryImpl(_context);
        }

        [HttpGet]
        [Route("api/task/getall")]
        public ActionResult GetAll() {
            return Ok(new {
                tasks = taskRepositoryImpl.getAll()
            });
        }

         [HttpPost]
        [Route("api/task/create")]
        public Education.Models.Task create([FromBody]Education.Models.Task task) {
            return taskRepositoryImpl.Create(task);
        }

        [HttpPut]
        [Route("api/task/edit/{id}")]
        public  Education.Models.Task Edit([FromBody] Education.Models.Task task) {
            return taskRepositoryImpl.Update(task);
        }

         [HttpDelete]
        [Route("api/task/delete/{id}")]
        public int Delete(int id) {
            return taskRepositoryImpl.Delete(id);
        }

    }
}