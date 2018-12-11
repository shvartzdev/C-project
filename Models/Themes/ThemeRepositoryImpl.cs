using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Education.DAL;
using Education.Models.Users;
using Microsoft.EntityFrameworkCore;


namespace Education.Models.Themes
{
    public class ThemeRepositoryImpl : Crud<Theme>
    {
        private EducationContext db;

        public ThemeRepositoryImpl(EducationContext context) {
            this.db = context;
        }

        public Theme Create(Theme t)
        {
           try {
               db.Themes.Add(t);
               db.SaveChanges();
               return t;
           } catch {
               throw  new NotImplementedException();
           }
        }

        public int Delete(int id)
        {
            try {
                Theme theme = db.Themes.Find(id);
                if (theme != null) {
                    db.Themes.Remove(theme);
                }
                db.SaveChanges();
                return 1;
            }catch {
                throw  new NotImplementedException();
            }
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Theme Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<Theme> getAll()
        {
            try {
                return db.Themes.ToList();
            } catch {
                throw new NotImplementedException();
            }
        }

        public Theme Update(Theme t)
        {
            try {
                if (t != null)
                db.Entry(t).State = EntityState.Modified;
                db.SaveChanges();
                return t;
            } catch {
                throw new NotImplementedException();
            }
        }
    }
}