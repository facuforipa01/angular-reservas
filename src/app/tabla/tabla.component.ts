import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { HomeService } from './api.service';
import { ReservasI } from '../interfaces/reservas.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
  styleUrls: ['./tabla.component.css'], // Cambiado a styleUrls
  templateUrl: './tabla.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
})
export class TablaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  reserva: ReservasI[] = [];
  dataSource = new MatTableDataSource<ReservasI>([]);

  displayedColumns: string[] = [
    'id',
    'cliente',
    'depto',
    'entrada',
    'salida',
    'estado',
    'accionAceptar',
    'accionRechazar',
  ];

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private homeService: HomeService) {
    //
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (
      data: ReservasI,
      filter: string
    ): boolean => {
      const lowerCaseFilter = filter.trim().toLowerCase();

      // Convertir las fechas a cadena para filtrar
      const desdeString =
        data.desde instanceof Date ? data.desde.toISOString() : data.desde;
      const hastaString =
        data.hasta instanceof Date ? data.hasta.toISOString() : data.hasta;

      // Combinar todas las propiedades en una sola cadena para buscar
      return (
        data.id.toString().toLowerCase().includes(lowerCaseFilter) ||
        data.usuario.nombre.toLowerCase().includes(lowerCaseFilter) ||
        data.departamento.nombre.toLowerCase().includes(lowerCaseFilter) ||
        desdeString.toLowerCase().includes(lowerCaseFilter) ||
        hastaString.toLowerCase().includes(lowerCaseFilter) ||
        data.estado.toLowerCase().includes(lowerCaseFilter)
      );
    };
  }

  sortedData!: ReservasI[];

  // Vincula el MatSort
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.homeService.getAllReservas().subscribe({
      next: (response) => {
        if (response.ok) {
          this.reserva = response.result.data;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reinicia la paginación al aplicar un filtro
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
