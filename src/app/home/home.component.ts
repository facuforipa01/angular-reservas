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
          console.log(response)
          this.reserva = response.result.data;
          console.log(this.reserva)
        } else {
          console.error('Error en la respuesta:', response.msg);
        }
      },
      error: (err) => {
        console.error('Error al obtener reservas:', err);
      },

    });
  }
  rechazadaReserva(id: number) {
    this.homeService.rechazadoReserva(id).subscribe(
      (data) => {
        alert(data.msg);
        window.location.reload(); // Recarga toda la página
      },
      (error) => console.error('Error al rechazar reserva:', error)
    );
  }
  

  activadaReserva() {
    this.homeService.activarReserva();
  }

  }




