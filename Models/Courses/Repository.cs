using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Education.Models;
using Microsoft.AspNetCore.Mvc;

namespace Education.Models
{
    public interface IRepository : IDisposable
    {
        List<Course> getAllCourses();
        Course GetCourse(int id);
        int Create(Course course);
        int Update(Course course);
        int Delete(int id);
   
    }
}
