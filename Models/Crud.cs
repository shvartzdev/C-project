using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Education.Models;
using Microsoft.AspNetCore.Mvc;


namespace Education.Models
{
    public interface Crud<T> : IDisposable
    {
        List<T> getAll();
        T Get(int id);
        T Create (T t);
        T Update (T t);
        int Delete(int id);
    }
}