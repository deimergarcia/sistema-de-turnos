import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../models/employee';
import { Employee } from '../../services/employee';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { inject } from '@angular/core';
import { AppointmentModel } from '../../models/appointment';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentList } from '../../modals/appointment-list/appointment-list';
import { AppointmentListModel } from '../../models/appointmentList';


@Component({
  standalone: true,
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {

  employees: EmployeeModel[] = [];
  appointments: AppointmentModel[] = [];
  loading = false;
  error: string | null = null;

  private employeeService = inject(Employee);
  private router = inject(Router);
  private authService = inject(Auth);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAppointments();
  }

  // Lee la lista de turnos asignados desde localStorage
  loadAppointments(): void {
    const storedAppointments = localStorage.getItem('appointments');
    this.appointments = storedAppointments ? JSON.parse(storedAppointments) : [];
  }

  // Filtra la lista de turnos para obtener solo los del empleado con el ID especificado
  getAppointmentsByEmployee(employeeId: number): AppointmentModel[] {
    return this.appointments.filter(appt => appt.employeeId === employeeId);
  }

  // Carga la lista de empleados
  loadEmployees(): void {
    this.loading = true;
    this.error = null;
    this.employeeService.getEmployees().subscribe({

      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar la lista de empleados.';
        this.loading = false;
      }
    });
  }

  // Navega a la vista de asignación de turno para un empleado específico
  assignAppointment(employeeId: number): void {
    this.router.navigate(['/asignar-turno', employeeId]);
  }

  // Abre un modal para mostrar los turnos asignados a un empleado específico
  showAppointments(employee: EmployeeModel): void {
    const employeeAppointments = this.getAppointmentsByEmployee(employee.id);
    const dialogData: AppointmentListModel = {
      employee: employee,
      appointments: employeeAppointments
    };

    this.dialog.open(AppointmentList, {
      data: dialogData
    });
  }

  // Cierra la sesión del usuario y lo redirige al login
  logout(): void {
    this.authService.logout();
  }

}
