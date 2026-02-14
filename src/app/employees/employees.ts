import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../models/employee';
import { Employee } from '../services/employee';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit{
  
  employees: EmployeeModel[] = [];
  loading = false;
  error: string | null = null;

  private employeeService = inject(Employee);
  private router = inject(Router);
  private authService = inject(Auth);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    console.log('estiy aqui');
    this.error = null;
    console.log('estiy aqui y error '+this.error);

    this.employeeService.getEmployees().subscribe({
      
      next: (data) => {
        console.log('estiy aqui2');
        this.employees = data;
        this.loading = false;
        console.log('estiy aqui4'+this.loading);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar la lista de empleados.';
        this.loading = false;
      }
    });
  }

  assignAppointment(employeeId: number):void{
    this.router.navigate(['/asignar-turno', employeeId]);
  }

  logout(): void{
    this.authService.logout();
  }
  
}
