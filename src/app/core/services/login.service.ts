import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, tap } from 'rxjs';
import {serialize} from 'cookie'


export interface LoginResponse {
  token: string;
  usuario: UsuarioD;
}

export interface UserI{
  email: string;
  password: string;
  token: string;
}

export interface UsuarioD {
  id: number;
  usuario: string;
  nombre: string;
  apellido: string;
  dni: number;
  competencia: string;
  fecha_nacimiento: Date;
  password: string;
  push_token: string;
  email: string;
  telefono: number;
  localidad: string;
  prefered_language: string;
  activo: number;
  fecha_hora_carga: Date;
  imagen_perfil: string;
  superadmin: number;
}

@Injectable({ providedIn: 'root' })
export class LoginService {

  private readonly cookies = inject(CookieService)
  //constructor(private readonly http: HttpClient) {}
  private readonly http = inject(HttpClient);
  // URL de nuestra API Rest
  private readonly url = 'http://localhost:3000/api/';

  login(email:string,password:string){
    const direction = this.url + 'usuarios/auth/login';
    return this.http.post<{ ok: boolean; token: string; msg: string }>(direction,{
      email,
      password
    })
    .pipe(
      catchError((e) => {
        console.log(e);
        throw new Error(e)
      }),
      tap((data) => {
        console.log(data);
        localStorage.setItem('token', data.token) //! COOKIES
      }),
    );
  }

  //* guardamos el token
  setLocalStorage(token: string){
    localStorage.setItem("x-token",token)
  }

  //* recupera el token
  getToken(){
    return this.cookies.get("token")
  }

  // login(email: string, password: string) {
  //   const direction = this.url + 'usuarios/auth/login';
  //   return this.http
  //     .post<any>(direction, {
  //       email,
  //       password,
  //     })
  //     .pipe(
  //       catchError((e) => {
  //         console.log(e.message);
  //         throw new Error(e);
  //       }),
  //       tap((data) => {
  //         console.log(data);
  //         localStorage.setItem('x-token', data.token);
  //       })
  //     );
  // }


}
