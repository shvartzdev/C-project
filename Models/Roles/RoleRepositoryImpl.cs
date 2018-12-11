using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Education.DAL;
using Education.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace Education.Models.Roles
{
    public class RoleRepositoryImpl : Crud<Role>
    {
        private EducationContext db;
        public RoleRepositoryImpl(EducationContext context)
        {
            this.db = context;
        }
        public Role Create(Role t)
        {
            try
            {
                db.Roles.Add(t);
                db.SaveChanges();
                return t;
            }
            catch
            {
                throw new NotImplementedException();
            }
        }

        public int Delete(int id)
        {
            try
            {
                Role role = db.Roles.Find(id);
                if (role != null)
                    db.Roles.Remove(role);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw new NotImplementedException();
            }
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Role Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<Role> getAll()
        {
            try
            {
                return db.Roles.ToList();
            }
            catch
            {
                throw new NotImplementedException();
            }
        }

        public Role Update(Role t)
        {
            try
            {
                if (t != null)
                    db.Entry(t).State = EntityState.Modified;
                db.SaveChanges();
                return t;
            }
            catch
            {
                throw new NotImplementedException();
            }
        }
    }
}