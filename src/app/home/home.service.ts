import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReservasI } from '../interfaces/reservas.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService  {
  // a = fetch('url').then((data) => {
  //   console.log(data);
  // });

  private readonly http = inject(HttpClient);

  private readonly url = 'http://localhost:3000/api/reservas';



  getAllReservas():Observable<ReservasI[]>{
    const direction = this.url + '/all-reservas'
    return this.http.get<ReservasI[]>(direction)

  }


}
