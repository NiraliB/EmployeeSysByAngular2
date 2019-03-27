using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EmployeeWebApi.Model;

namespace EmployeeWebApi.Models
{
    public class EmployeeWebApiDbContext : DbContext
    {
        public EmployeeWebApiDbContext (DbContextOptions<EmployeeWebApiDbContext> options): base(options)
        {
        }

        public DbSet<Employee> Employee { get; set; }
    }
}
