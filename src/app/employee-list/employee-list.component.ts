import { Component, OnInit } from '@angular/core';
import { IEmployees } from "../employee/IEmployee";
import { Router } from "@angular/router";
import { EmployeeService } from "../employee/employee.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  newPage: string = "Employee List";
  empIModel: IEmployees[] = [];
  getEmpId: number;

  constructor(private _empService: EmployeeService, private _router: Router) {
  }

  deleteRecord(getEmpId) {
    this._empService.deleteEmployeeData(getEmpId).subscribe((res: number) => {
      this.getEmpId = res
      if (this.getEmpId != null && this.getEmpId != undefined) {
        this.ngOnInit();
      }
    });

  }

  ngOnInit() {
    this._empService.getEmployeeList().subscribe(res => {
      this.empIModel = res
    });

  }

}
