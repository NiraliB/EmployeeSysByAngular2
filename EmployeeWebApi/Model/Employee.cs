using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeWebApi.Model
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public string EmpSurname { get; set; }
        public string Qualification { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string Language { get; set; }
        public string Experience { get; set; }
    }
}
