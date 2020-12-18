import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsService } from '../../../services/tabs.service';
import { ActividadesService } from '../../../services/actividades.service';
import { Actividad } from '../../../shared/actividades.interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.page.html',
  styleUrls: ['./agregar-actividad.page.scss'],
})
export class AgregarActividadPage implements OnInit {

  imagen : string;
  nombreImagen : string;
  json : any;
  file : any;
  editarActividad: string;
  cantidadItem: any;
  contenidoActividad : string;
  tituloActividad: string;
  tituloCategoria: string;
  id: string;
  nivel: string;
  user: any;

  constructor(public router: Router, 
              public tabEstado: TabsService,
              private route: ActivatedRoute,
              public actividadService: ActividadesService,
              public auth: AuthService) { 
    this.tabEstado.cambiarEstado(true);
    this.cargarActividad();
  }

  async ngOnInit() {
    this.user = (await this.auth.afAuth.currentUser).uid;
    await this.obtenerCantidadItem();
    await this.cargarActividad();
    this.editarActividad = await this.route.snapshot.paramMap.get('editar');
  }

  async ionViewWillEnter() {
    await this.obtenerCantidadItem();
    await this.cargarActividad();
    this.editarActividad = await this.route.snapshot.paramMap.get('editar');
  }

  async guardar() {
    let dataActividad: Actividad;
    dataActividad = await JSON.parse(localStorage.getItem("actividad"));
    if(this.editarActividad){
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }else{
      await this.actividadService.crearActividad(dataActividad,this.user);
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }    
  }  

  async cancelar() {

    let dataActividad: Actividad
    
    dataActividad = await JSON.parse(localStorage.getItem("actividad"))

    if(this.editarActividad){
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }else{
      await this.actividadService.removerActividad(dataActividad);
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }
  }

  obtenerCantidadItem() {
    this.actividadService.obtenerActividad(this.tituloActividad,this.tituloCategoria).subscribe(resp=>{this.cantidadItem = resp.length})
  }

  agregarAccion() {
    localStorage.removeItem('imagenes');
    this.router.navigate(['/tablinks/editar-actividad/cargar-actividad']);    
  }

  async cargarActividad() {
    this.json = await JSON.parse(localStorage.getItem('actividad'))
    this.tituloCategoria = this.json.categoria;
    this.tituloActividad = this.json.actividad;
    this.imagen = this.json.imagen;
    this.contenidoActividad = this.json.contenidoActividad;
    this.nivel = this.json.nivel;
  }

}
