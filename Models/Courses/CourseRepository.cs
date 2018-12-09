using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Education.DAL;
using Education.Models;
using Microsoft.EntityFrameworkCore;

namespace Education.Models
{
    public class CourseRepository : IRepository
    {
        private EducationContext db;


        public CourseRepository(EducationContext context)
        {
            this.db = context;
        }

        public List<Course> getAllCourses()
        {
            try
            {
                return db.Courses.ToList();
            } catch
            {
                throw new NullReferenceException();
            }
        }

       

        public Course GetCourse(int id)
        {
            return db.Courses.Find(id);
        }

        public int Create (Course course)
        {
            try
            {
                db.Courses.Add(course);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int Update(Course course)
        {
            try
            {
                // db.Entry(course).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return 1;
            } catch
            {
                throw;
            }
        }
        public int Delete(int id)
        {
            try
            {
                Course course = db.Courses.Find(id);
                if (course != null)
                    db.Courses.Remove(course);
                db.SaveChanges();
                return 1;
            } catch
            {
                throw;
            }
        }
    

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
                if (disposing)
                    db.Dispose();
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


    }
}