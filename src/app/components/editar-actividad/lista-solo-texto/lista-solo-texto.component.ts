import { Component, OnInit } from '@angular/core';
import { ActividadImagenes } from '../../../shared/actividadSoloImagenes.interfaces';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'app-lista-solo-texto',
  templateUrl: './lista-solo-texto.component.html',
  styleUrls: ['./lista-solo-texto.component.scss'],
})
export class ListaSoloTextoComponent implements OnInit {

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
    this.actividadService.removerItemSoloTexto(item);
  }

}
