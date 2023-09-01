import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  storeEmpData(empid:string, name:string,project:string){
    const postdata = {empid,name,project};
    return this.http.post('http://localhost:4900/addEmployee', postdata)
  }
  getEmployeeList(){
    return this.http.get('http://localhost:4900/getEmployees')
  }
}
