import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EmployeeModel } from '../models/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Employee {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL de la API externa

  private http = inject(HttpClient);

  getEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.apiUrl).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Intenta obtener el mensaje del backend, si no, usa uno genérico
    const errorMessage = error.error?.message || error.message || 'Error desconocido';

    console.error('Error en la petición:', error);
    return throwError(() => new Error(errorMessage));
  }

}
