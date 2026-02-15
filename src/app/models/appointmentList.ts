import { EmployeeModel } from "./employee";
import { AppointmentModel } from "./appointment";

export interface AppointmentListModel {
  employee: EmployeeModel;
  appointments: AppointmentModel[];
}