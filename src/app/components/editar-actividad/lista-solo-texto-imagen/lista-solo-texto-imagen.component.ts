import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../../shared/actividades.interfaces';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'app-lista-solo-texto-imagen',
  templateUrl: './lista-solo-texto-imagen.component.html',
  styleUrls: ['./lista-solo-texto-imagen.component.scss'],
})
export class ListaSoloTextoImagenComponent implements OnInit {

  data = [];
  dataActividad: Actividad;

  constructor(public actividadService: ActividadesService) { 
    this.cargarDatosLocalStorage();
    
  }

  ngOnInit() {}

  async cargarDatosLocalStorage (){
    this.dataActividad = await JSON.parse(localStorage.getItem("actividad"))
    await this.obtenerActividad();
  }

  async obtenerActividad() {
    await this.actividadService.obtenerActividad(this.dataActividad.actividad,this.dataActividad.categoria).subscribe(resp =>{ this.data = resp});  
  }

  async eliminarItem(item: any){
    this.actividadService.removerItemSoloImagenes(item);
  }

}
