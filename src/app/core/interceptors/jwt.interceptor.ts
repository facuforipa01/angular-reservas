import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { TOKEN } from '../constants/service-keys';
import { LoginService } from '../services/login.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  //* Si la solicitud es para la ruta de inicio de sesión, omitir el interceptor
  if (req.url.includes('/login')) {
    return next(req); //* Deja pasar la request sin modificar
  }

  const cookieService = inject(CookieService);
  const auth = inject(LoginService);
  const token = cookieService.get(TOKEN);
  if (token) {
    //* Clonamos el request, para insertar el token
    const request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    //* Como es un observable, nos podemos suscribir para obtener los resultado, o,
    //* en su defecto, el mensaje de error
    return next(request).pipe(
      catchError((e) => {
        if (e instanceof HttpErrorResponse ? e.status === 401 : false) {
          auth.logout();
          return throwError(() => new Error('Unauthorized'));
        } else {
          return throwError(() => new Error('Internal server error'));
        }
      })
    );
  } else {
    //* Si el token no existe, nos deslogueamos
    auth.logout();
    return throwError(() => new Error('Not token provided'));
  }
};