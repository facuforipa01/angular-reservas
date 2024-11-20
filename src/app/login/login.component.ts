import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, UsuarioD } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  email!: "string";
  password!: string;

  login() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (data) => {
        this.router.navigate(['/tabla'])
      },
      error: (e) => {
        console.error(e);
      }
    })
 
  }
}
