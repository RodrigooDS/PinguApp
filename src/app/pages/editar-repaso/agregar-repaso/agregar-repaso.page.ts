import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { TabsService } from '../../../services/tabs.service';
import { RepasosService } from '../../../services/repasos.service';
import { Repaso } from '../../../shared/repasos.interfaces';


@Component({
  selector: 'app-agregar-repaso',
  templateUrl: './agregar-repaso.page.html',
  styleUrls: ['./agregar-repaso.page.scss'],
})
export class AgregarRepasoPage implements OnInit {

  editarRepaso: string;
  cantidadItem: any;
  imagen : string;
  nombreImagen : string;
  json : any;
  data = [];
  tituloActividad: string;
  tituloCategoria: string;
  id: string;
  nivel: string;

  constructor(public router: Router,
              public repasoService: RepasosService,
              private route: ActivatedRoute,
              public tabEstado: TabsService) { 
    this.tabEstado.cambiarEstado(true);
    this.cargarRepaso();
  }

  async ngOnInit() {
    await this.obtenerCantidadItem();
    await this.cargarRepaso();
    await this.obtenerActividad();
    this.editarRepaso = await this.route.snapshot.paramMap.get('editar');
  }

  async ionViewWillEnter(){
    await this.obtenerCantidadItem();
    await this.cargarRepaso();
    await this.obtenerActividad();
    this.editarRepaso = await this.route.snapshot.paramMap.get('editar');
  }

  async guardar() {
    let dataRepaso: Repaso;
    dataRepaso = await JSON.parse(localStorage.getItem("repaso"));
    if(this.editarRepaso){
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-repaso']);
      localStorage.clear();
    }else{
      await this.repasoService.crearRepaso(dataRepaso);
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-repaso']);
      localStorage.clear();
    }    
  }  

  async cancelar() {
    let dataRepaso: Repaso
    dataRepaso = await JSON.parse(localStorage.getItem("actividad"))
    if(this.editarRepaso){
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-repaso']);
      localStorage.clear();
    }else{
      await this.repasoService.removerActividad(dataRepaso);
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-repaso']);
      localStorage.clear();
    }
  }

  agregarAccion() {
    localStorage.removeItem('imagenes');
    this.router.navigate(['/tablinks/editar-repaso/cargar-repaso']);    
  }

  cargarRepaso() {
    this.json = JSON.parse(localStorage.getItem('repaso'))
    this.tituloCategoria = this.json.categoria;
    this.tituloActividad = this.json.actividad;
    this.imagen = this.json.imagen;
    this.nombreImagen = this.json.nombreImagen;
    this.nivel = this.json.nivel;
  }

  async eliminarItem(item: any){
    this.repasoService.removerItem(item);
  }

  obtenerActividad() {
    this.repasoService.obtenerRepaso(this.tituloActividad,this.tituloCategoria).subscribe( resp => {this.data = resp;});
  }

  obtenerCantidadItem() {
    this.repasoService.obtenerRepaso(this.tituloActividad,this.tituloCategoria).subscribe(resp=>{this.cantidadItem = resp.length})
  }

}
