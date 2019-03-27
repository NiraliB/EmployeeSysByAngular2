using EmployeeWebApi.Model;
using EmployeeWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeWebApi
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeWebApiDbContext _context;

        public EmployeesController(EmployeeWebApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Employee> GetEmployee()
        {
            return _context.Employee;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetEmployeeOnEdit(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }
        
        [HttpPost]
        public async Task<IActionResult> PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (employee.EmpId == 0)
            {
                _context.Employee.Add(employee);
            }
            else
            {
                _context.Entry(employee).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(employee.EmpId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employee.EmpId);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.EmpId == id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.EmpId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

    }
}