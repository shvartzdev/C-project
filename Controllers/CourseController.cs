using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Models;
using Education.DAL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Education.Controllers
{
    public class CourseController : Controller
    {
        private readonly EducationContext _context;
        private CourseRepository courseRepository;

        public CourseController(EducationContext context)
        {
            _context = context;
            courseRepository =  new CourseRepository(_context);
        }        

        [HttpGet]
        [Route("api/course/getall")]
        public ActionResult GetAll()
        {
            //IEnumerable<Course> list = courseRepository.getAllCourses();
            return Ok(new
            {
                courses = courseRepository.getAllCourses()
            });
        }

        [HttpPost]
        [Route("api/course/create")]
        public int create([FromBody]Course course)
        {
            return courseRepository.Create(course);
        }

        [HttpGet]
        [Route("api/course/details/{id}")]
        public Course details(int id)
        {
            return courseRepository.GetCourse(id);
        }

        [HttpPut]
        [Route("api/course/edit")]
        public int Edit(Course course)
        {
            return courseRepository.Update(course);
        }

        [HttpDelete]
        [Route("api/course/delete/{id}")]
        public int Delete(int id)
        {
            return courseRepository.Delete(id);
        }

        [HttpGet]
        [Route("api/course/getcourselist")]
        public IEnumerable<Course> Details()
        {
            return courseRepository.getAllCourses();
        }
    }
}
