// import { Injectable } from '@angular/core';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployees } from "../employee/IEmployee";

@Injectable()
export class EmployeeService {
    private _employeeSaveUrls: string = 'https://localhost:44393/api/Employees/PostEmployee/';
    private _employeeListUrl : string = 'https://localhost:44393/api/Employees/GetEmployee';
    private _employeeDeleteUrl : string ='https://localhost:44393/api/Employees/DeleteEmployee?'
    private _employeeEditUrl : string ='https://localhost:44393/api/Employees/GetEmployeeOnEdit?'

    constructor(private _http: HttpClient) {
    }
    
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

   public getEmployeeList() : Observable<IEmployees[]> {
        return this._http.get<IEmployees[]>(this._employeeListUrl);
    }

    public saveEmployeeData(empModel) {
        let body = JSON.stringify(empModel);
        return this._http.post(this._employeeSaveUrls, body, this.httpOptions);
    }

    public deleteEmployeeData(getEmpId)
    {
        return this._http.post(this._employeeDeleteUrl + 'id=' + getEmpId,this.httpOptions);
    }

    public editEmpRecordOnId(editEmpId) : Observable<IEmployees[]>{
      return this._http.get<IEmployees[]>(this._employeeEditUrl + 'id=' + editEmpId,this.httpOptions);
    }

}