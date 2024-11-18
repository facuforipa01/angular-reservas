import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, UsuarioD } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  // constructor(private readonly loginService: LoginService) {}
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
clave: any;
usuario: any;

  ngOnInit() {
    // localStorage.clear();
    localStorage.clear();
  }


  email!: string;
  password!: string;

  checkToken() {
    if (this.loginService.getToken()) {
      this.router.navigate(['/tabla'])
    }
  }
  
  //funcion, que si existe un token en nuestro local storage o cookie, nos redireccione enseguida a la ventana principal, en vez de andar iniciando a cada rato

  // login() {
  //   const user = { email: this.email, password: this.password };
  //   this.loginService.login(user.email, user.password)
  //     .subscribe(data => {


  //       this.router.navigate(['/home'])
  //     })


  // }

  login() {
    const a = this.loginService.login(this.email, this.password).subscribe({
      next: (data) => {},
      error: (e: any) => {
        console.log({e});
        alert('Error de login ' + JSON.stringify(e));
        // alert('Error de login ' + JSON.stringify(e));
      },
      complete: () => {
        this.router.navigate(['/tabla']);
      },
    });
  }

}
