import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmpInitialization } from "../employee/empInitialCls";
import { EmployeeModule } from "../employee/employee.module";
import { EmployeeService } from "../employee/employee.service";
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployees } from "../employee/IEmployee";




@Component({
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  pageTitle: string = 'Employee Entry';
  assignQuali: any[];
  assignExp: any[];
  assignLan: any[];
  getEmpId: number;
  empEditDataModel: IEmployees;
  empModel = new EmployeeModule(0, '', '', '', '', '', false, '', null);
  chkVal = new Array();
  lanIsChecked_: boolean = false;
  constructor(private getInitData: EmpInitialization,
    private _empSaveService: EmployeeService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) { }

  checkLangBox(getChkName, getEvent) {
    if (getEvent.target.checked) {
      this.chkVal.push(getChkName);
    }
    else {
      const index: number = this.chkVal.indexOf(getChkName);
      if (index !== -1) {
        this.chkVal.splice(index, 1);
      }
    }
    this.empModel.Language = this.chkVal.join(",");
  }

  cancelEmpData() {
    this.empModel = new EmployeeModule(0, '', '', '', '', '', false, '', null);
    this._router.navigate(['/Employee', '0', 'edit']);
  }

  empDataSave(GetModelVal) {
    console.log('Emp Name : ' + GetModelVal.EmpName);
    console.log('Emp Surname : ' + GetModelVal.EmpSurname);
    console.log('Qualification : ' + GetModelVal.Qualification);
    console.log('Experience : ' + GetModelVal.Experience);
    this._empSaveService.saveEmployeeData(GetModelVal).subscribe((res: number) => {
      this.getEmpId = res;
      if (this.getEmpId != null && this.getEmpId != undefined) {
        this._router.navigate(['/EmployeeList']);
      }
    });
  }

  editEmployeeRecord(editId) {
    this._empSaveService.editEmpRecordOnId(editId).subscribe((res) => {
      this.empModel["EmpId"] = res["empId"];
      this.empModel["EmpName"] = res["empName"];
      this.empModel["EmpSurname"] = res["empSurname"];
      this.empModel["Qualification"] = res["qualification"];
      this.empModel["Experience"] = res["experience"];
      this.empModel["Address"] = res["address"];
      this.empModel["ContactNumber"] = res["contactNumber"];

      var getCommaLang = res["language"];
      var arrSpltLang = getCommaLang.split(',');
      
      for (var i = 0; i < arrSpltLang.length; i++) {
        var arrObjLan = JSON.stringify(arrSpltLang[i]).replace(/"/g, '');
        var getChkId = "chLan_[" + arrObjLan + "]";
        const ckLangBox = document.getElementById(getChkId) as HTMLInputElement;
        ckLangBox.checked = true;
        this.chkVal.push(arrObjLan);
      }
    })
  }

  ngOnInit(): void {
    this.empModel = new EmployeeModule(0, '', '', '', '', '', false, '', null);

    let empParamId = this._activateRoute.snapshot.params['id'];
    if (empParamId != "0" && empParamId != undefined) {
      this.editEmployeeRecord(empParamId);
    }
    this.assignQuali = this.getInitData.Qualification;
    this.assignExp = this.getInitData.Experience;
    this.assignLan = this.getInitData.Languages;

  }

}
