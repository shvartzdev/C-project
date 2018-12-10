using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Data.Entity;
using Education.DAL;
using Education.Models;
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;

namespace Education.Models.Courses
{
    public class CourseRepositoryImpl : CourseRepository
    {
        private EducationContext db;


        public CourseRepositoryImpl(EducationContext context)
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

        public Course Create (Course course)
        {
            try
            {
                db.Courses.Add(course);
                db.SaveChanges();
                return course;
            }
            catch
            {
                throw;
            }
        }

        public Course Update(Course course)
        {
            try
            {
                if (course != null) 
                    db.Entry(course).State=EntityState.Modified;
                //  db.Entry(course).State = 
                //     Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                return course;
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