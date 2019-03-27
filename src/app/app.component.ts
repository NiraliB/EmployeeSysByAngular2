import { Component } from '@angular/core';
import { EmpInitialization } from "./employee/empInitialCls";
import { EmployeeService } from "./employee/employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[EmpInitialization,EmployeeService]
})
export class AppComponent {
  pageTitle = 'Employee Management ';
}
