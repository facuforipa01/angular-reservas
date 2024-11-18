import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private readonly url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllReservas(): Observable<ResponseI> {
    return this.http.get<ResponseI>(`${this.url}/reservas`);
  }


  //falta tomar el id (hardcodeado en 1)

  rechazadoReserva(): Observable<any> {
    return this.http.patch(`${this.url}/reservas/1/rechazar`, {})
  }

  activarReserva(): Observable<any> {
    return this.http.patch(`${this.url}/reservas/1/aceptar`, {})
  }

}
