
export class EmployeeModule {
  constructor(
    public EmpId : number,
    public EmpName: string,
    public EmpSurname: string,
    public Qualification: string,
    public Experience: string,
    public Language : string,
    public isChecked : boolean,
    public Address: string,
    public ContactNumber: number
    ) {

  }

}
