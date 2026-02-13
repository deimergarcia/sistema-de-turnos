import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Employees } from './employees/employees';
import { AppointmentForm } from './appointment-form/appointment-form';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'empleados',
        component: Employees,
        canActivate: [authGuard]
    },
    {
        path: 'asignar-turno/:id',
        component: AppointmentForm,
        canActivate: [authGuard]
    },
    {
        path:'',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
