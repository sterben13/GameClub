import { Prestamo } from './../../class/prestamo';
import { PrestamoService } from './../../services/prestamo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  prestamos: Prestamo[];
  constructor(private prestamoService: PrestamoService) { }

  ngOnInit() {
    this.prestamoService.findAll().then((prestamos)=>{
      this.prestamos=prestamos
    }).catch((err)=>{
      console.log(err);
    });
  }
}
