using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Education.Models;
using Microsoft.AspNetCore.Mvc;

namespace Education.Models.Courses
{
    public interface CourseRepository : IDisposable
    {
        List<Course> getAllCourses();
        Course GetCourse(int id);
        Course Create(Course course);
        Course Update(Course course);
        int Delete(int id);
   
    }
}
