import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  resText:any; empList:any;

  constructor(private empService:EmployeeService){}

  empData(empid:string, name:string, project:string){
   this.empService.storeEmpData(empid,name,project).subscribe((res:any)=>this.resText);
  }
  getEmployees(){
    this.empService.getEmployeeList().subscribe((res:any)=>this.empList=res)
  }
}
