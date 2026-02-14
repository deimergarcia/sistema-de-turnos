import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../services/employee';
import { Auth } from '../services/auth';
import { Validators } from '@angular/forms';
import { AppointmentModel } from '../models/appointment';
import { EmployeeModel } from '../models/employee';

@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule],
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

  // Validador personalizado para la hora de fin
  timeRangeValidator = (group: FormGroup): { [key: string]: any } | null => {
    const startTime = group.get('startTime')?.value;
    const endTime = group.get('endTime')?.value;

    if (startTime && endTime && startTime >= endTime) {
      return { 'invalidTimeRange': true };
    }
    return null;
  }

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

      // Guardar en localStorage (Requisito Opcional)
      let appointments: AppointmentModel[] = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));

      this.successMessage = 'Turno asignado correctamente.';
      this.errorMessage = null;
      // Opcional: Resetear el formulario o redirigir
      // this.appointmentForm.reset();
      // this.router.navigate(['/empleados']);
    }
  }

  goBack(): void {
    this.router.navigate(['/empleados']);
  }

  logout(): void {
    this.authService.logout();
  }

}
