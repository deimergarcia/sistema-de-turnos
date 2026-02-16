import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, formatDate } from '@angular/common'; // Importa CommonModule para *ngIf, *ngFor
import { AppointmentModel } from '../../models/appointment'; // Asegúrate de la ruta correcta
import { EmployeeModel } from '../../models/employee'; // Asegúrate de la ruta correcta
import { AppointmentListModel } from '../../models/appointmentList';
import { FormatDatePipe } from '../../pipes/format-date-pipe';
import { FormatTimePipe } from '../../pipes/format-time-pipe';

@Component({
  selector: 'app-appointment-list',
  imports: [MatDialogModule, MatButtonModule, CommonModule, FormatDatePipe, FormatTimePipe],
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
