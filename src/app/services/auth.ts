import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class Auth {

  private router = inject(Router);

  private isAuthenticated = false;
  private readonly credentials = { email: 'admin@test.com', password: '123456' };



  login(email: string, password: string) {
    if (email === this.credentials.email && password === this.credentials.password) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  IsAuthenticated(): boolean {
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  }

}
