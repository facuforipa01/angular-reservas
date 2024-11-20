import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { HomeService } from './api.service';
import { ReservasI } from '../interfaces/reservas.interface';

@Component({
  selector: 'app-tabla',
  styleUrls: ['./tabla.component.css'], // Cambiado a styleUrls
  templateUrl: './tabla.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class TablaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  reserva: ReservasI[] = [];
  dataSource = new MatTableDataSource<ReservasI>([]);
 
  displayedColumns: string[] = ['id', 'cliente', 'depto', 'entrada', 'salida', 'estado', 'accionAceptar', 'accionRechazar'];

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private homeService: HomeService) {
    //
    this.dataSource.sort = this.sort;
  }

  sortedData!: ReservasI[];

  // Vincula el MatSort
  @ViewChild(MatSort) sort!: MatSort;

 
 

  ngAfterViewInit() {
    this.homeService.getAllReservas().subscribe({
      next: (response) => {
        if (response.ok) {
          this.reserva = response.reservas.data;
          this.dataSource.data = this.reserva;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Error en la respuesta:', response.msg);
        }
      },
      error: (err) => {
        console.error('Error al obtener reservas:', err);
      },
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Ordenado en orden ${sortState.direction}`);
    } else {
      this._liveAnnouncer.announce('Orden eliminado');
    }
  }
  rechazadaReserva() {
    this.homeService.rechazadoReserva();
  }
  activadaReserva() {
    this.homeService.activarReserva();
  }
}
