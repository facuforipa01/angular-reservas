import { Component, inject, Input, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ReservasI } from '../interfaces/reservas.interface';
import { UsuarioI } from '../interfaces/usuario.interface';
import { DepartamentoI } from '../interfaces/departamento.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [],
  providers: [],
})
export class HomeComponent implements OnInit {
  
  
  ngOnInit(): void {
    this.getAll();
  }

  private readonly homeService = inject(HomeService);

  reserva! : ReservasI[];
  usuario!: UsuarioI[];
  departamento!: DepartamentoI[]; 


  // getAll(){
  //   this.homeService.getAllParcelas().subscribe((data:any) =>{
  //     console.log(data);
  //     this.parcela = data.parcelas
  //   },( error) => {
  //     console.log(error)
  //   })
  // }

  getAll(){
    const res = this.homeService.getAllReservas().subscribe({
      next: (data) => {
       
        this.reserva = data;
        console.log(data)
      },
      error: (e:any) => {
        console.log({e})
      }
    })
  }



}
