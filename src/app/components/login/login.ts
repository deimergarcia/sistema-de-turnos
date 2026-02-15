import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { LoginCredentialsModel } from '../../models/credentials';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  errorMessage: string | null = null;

  private authService = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Crea el formulario de login con validaciones
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Valida credenciales y abre el listado de empleados
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as LoginCredentialsModel;
      const loginSuccess = this.authService.login(credentials.email, credentials.password);

      if (loginSuccess) {
        this.errorMessage = null;
        this.router.navigate(['/empleados']);
      } else {
        this.errorMessage = 'Credenciales inválidas. Intente nuevamente.';
      }

    }
  };
}
