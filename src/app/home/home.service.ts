import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from '../interfaces/response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeService  {
  
  private readonly url = 'http://localhost:3002/api';
  

  constructor(private http: HttpClient) { }

  getAllReservas():Observable<ResponseI>{
    return this.http.get<ResponseI<any>>(`${this.url}/reservas`);
  }
  
  rechazadoReserva(id:number): Observable<any> {
    console.log('Esto andaaaa')
    return this.http.patch<ResponseI<any>>(`${this.url}/reservas/${id}/rechazar`, {})
  }

  activarReserva(): Observable<any> {
    return this.http.patch(`${this.url}/reservas/1/aceptar`,{})
  }

}

