import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { EmployeeModel } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class Employee {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL de la API externa

  private http = inject(HttpClient);

  getEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.apiUrl);
  }
  
}
