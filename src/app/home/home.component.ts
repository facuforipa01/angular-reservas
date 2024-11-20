import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ReservasI } from '../interfaces/reservas.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [],
  providers: [],
})

export class HomeComponent implements OnInit {
  reserva: ReservasI[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getAllReservas().subscribe({
      next: (response) => {
        if (response.ok) {
          this.reserva = response.result.data;
        } else {
          console.error('Error en la respuesta:', response.msg);
        }
      },
      error: (err) => {
        console.error('Error al obtener reservas:', err);
      },
    });
  }
  rechazadaReserva() {
    this.homeService.rechazadoReserva();
  }
  activadaReserva() {
    this.homeService.activarReserva();
  }
}
