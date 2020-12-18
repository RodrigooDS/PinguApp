import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObtenerActivadesService } from '../../../services/obtener-activades.service';
import { AuthService } from '../../../services/auth.service';
import { AsignacionActividadesService } from '../../../services/asignacion-actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  tituloActividad: string = '';
  tituloCategoria: string = '';
  tipoPregunta: string = '';
  actividades: any[] = [];

  constructor(public router: Router,
              private actividadesService: ObtenerActivadesService,
              private auth: AuthService,
              private asignacionService: AsignacionActividadesService) {
    
    this.tituloCategoria = JSON.parse(localStorage.getItem('categoria'));
  
  }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser;
    let rut = await this.asignacionService.obtenerAlumnoAsignadoPorUid(user.uid)
    this.obtenerActividades(rut);
  }


  obtenerActividades(rut:string) {
    this.asignacionService.obtenerActividadesPorRut(rut,this.tituloCategoria).subscribe(resp => this.actividades = resp);
  }

  obtenerActividad(actividad: string, contenidoActividad: string, tipoPregunta: string, imagen: string) {

    let datos = {
      actividad : actividad,
      interaccion: contenidoActividad,
      tipoPregunta: tipoPregunta,
      imagen: imagen
    }
    localStorage.setItem('actividad', JSON.stringify(datos));

    if(contenidoActividad == "Solo texto" || contenidoActividad == "Solo imágenes" || contenidoActividad == "Solo imágenes y texto"){
      this.router.navigate(['/tablinks/actividad/desarrollo-actividad']);
    } 
       
  }
}
