import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf, *ngFor
import { AppointmentModel } from '../../models/appointment'; // Asegúrate de la ruta correcta
import { EmployeeModel } from '../../models/employee'; // Asegúrate de la ruta correcta
import { AppointmentListModel } from '../../models/appointmentList';

@Component({
  selector: 'app-appointment-list',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList {

  constructor(
    public dialogRef: MatDialogRef<AppointmentList>,
    @Inject(MAT_DIALOG_DATA) public  data: AppointmentListModel // Tipado actualizado
  ) {}

  onClose(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }

}
