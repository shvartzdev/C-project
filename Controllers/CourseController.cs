using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Models.Courses;
using Education.DAL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Education.Controllers
{
    public class CourseController : Controller
    {
        private readonly EducationContext _context;
        private CourseRepositoryImpl courseRepositoryImpl;

        public CourseController(EducationContext context)
        {
            _context = context;
            courseRepositoryImpl =  new CourseRepositoryImpl(_context);
        }        

        [HttpGet]
        [Route("api/course/getall")]
        public ActionResult GetAll()
        {
            //IEnumerable<Course> list = courseRepositoryImplgetAllCourses();
            return Ok(new
            {
                courses = courseRepositoryImpl.getAll()
            });
        }

        [HttpPost]
        [Route("api/course/create")]
        public Course create([FromBody]Course course)
        {
            return courseRepositoryImpl.Create(course);
        }

        [HttpGet]
        [Route("api/course/details/{id}")]
        public Course details(int id)
        {
            return courseRepositoryImpl.Get(id);
        }

        [HttpPut]
        [Route("api/course/edit/{id}")]
        public Course Edit([FromBody]Course course)
        {
            return courseRepositoryImpl.Update(course);
        }

        [HttpDelete]
        [Route("api/course/delete/{id}")]
        public int Delete(int id)
        {
            return courseRepositoryImpl.Delete(id);
        }

        [HttpGet]
        [Route("api/course/getcourselist")]
        public IEnumerable<Course> Details()
        {
            return courseRepositoryImpl.getAll();
        }
    }
}
