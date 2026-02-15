import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../services/employee';
import { Auth } from '../../services/auth';
import { Validators } from '@angular/forms';
import { AppointmentModel } from '../../models/appointment';
import { EmployeeModel } from '../../models/employee';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogModel } from '../../models/ConfirmationDialog';

import { ConfirmationDialog } from '../../modals/confirmation-dialog/confirmation-dialog';


@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule,],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
})
export class AppointmentForm implements OnInit {

  appointmentForm!: FormGroup;
  appointment: AppointmentModel[] = [];
  employee: EmployeeModel | undefined;
  employeeId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(Employee)
  private authService = inject(Auth);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    }, { validators: [this.timeRangeValidator] })

    // Obtiene el ID del empleado de la URL
    this.route.paramMap.subscribe(params => {
      this.employeeId = Number(params.get('id'));
      if (this.employeeId) {
        this.loadEmployeeDetails(this.employeeId);
      }
    });
  }

  // Validador personalizado para asegurar que la hora de fin sea mayor a la de inicio
  timeRangeValidator = (group: FormGroup): { [key: string]: any } | null => {
    const startTime = group.get('startTime')?.value;
    const endTime = group.get('endTime')?.value;
    if (startTime && endTime && startTime >= endTime) {
      return { 'invalidTimeRange': true };
    }
    return null;
  }

  // Carga los detalles del empleado seleccionado usando el servicio
  loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employee = employees.find(emp => emp.id === id);
      },
      error: (err) => {
        console.error('Error al cargar detalles del empleado:', err);
        this.errorMessage = 'No se pudo cargar la información del empleado.';
      }
    });
  }

  // Se ejecuta cuando el usuario envía el formulario de asignación de turno
  onSubmit(): void {
    if (this.appointmentForm.valid && this.employeeId) {
      const formData = this.appointmentForm.value;
      const newAppointment: AppointmentModel = {
        id: Date.now(), // ID temporal simple
        employeeId: this.employeeId,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime
      };

      // Guardar en localStorage
      let appointments: AppointmentModel[] = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));

      // Abre el modal de confirmación
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          title: 'Turno Asignado',
          message: 'Turno asignado correctamente.'
        } as ConfirmationDialogModel
      });

      // Cierra el modal de confirmación
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.router.navigate(['/empleados']);
        }
      });
    }
  }

  // Navega de vuelta a la lista de empleados
  goBack(): void {
    this.router.navigate(['/empleados']);
  }

  // Cierra la sesión del usuario y lo redirige al login
  logout(): void {
    this.authService.logout();
  }

}
