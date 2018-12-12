using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Education.DAL;
using Education.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace Education.Models.Tasks
{
    public class TaskRepositoryImpl : Crud<Task>
    {
        private EducationContext db;

        public TaskRepositoryImpl(EducationContext context) {
            this.db = context;
        }

        public Task Create(Task t)
        {
            try {
                db.Tasks.Add(t);
                db.SaveChanges();
                return t;
            } catch {
            throw new NotImplementedException();
            }
        }

        public int Delete(int id)
        {
            try {
                Task task = db.Tasks.Find(id);
                if (task != null)
                db.Tasks.Remove(task);
                db.SaveChanges();
                return 1;
            } catch {
            throw new NotImplementedException();
            }
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Task Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<Task> getAll()
        {
            try {
                return db.Tasks.ToList();
            } catch {
            throw new NotImplementedException();
            }
        }

        public Task Update(Task t)
        {
            try {
                if (t!= null)
                db.Entry(t).State = EntityState.Modified;
                db.SaveChanges();
                return t;
            } catch {
            throw new NotImplementedException();
            }
        }
    }
}