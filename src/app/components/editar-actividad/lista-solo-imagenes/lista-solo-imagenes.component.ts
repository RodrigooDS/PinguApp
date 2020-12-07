import { Component, Input, OnInit } from '@angular/core';
import { ActividadesService } from '../../../services/actividades.service';
import { ActividadImagenes } from '../../../shared/actividadSoloImagenes.interfaces';

@Component({
  selector: 'app-lista-solo-imagenes',
  templateUrl: './lista-solo-imagenes.component.html',
  styleUrls: ['./lista-solo-imagenes.component.scss'],
})
export class ListaSoloImagenesComponent implements OnInit {

  data = [];
  dataActividad: ActividadImagenes;

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
