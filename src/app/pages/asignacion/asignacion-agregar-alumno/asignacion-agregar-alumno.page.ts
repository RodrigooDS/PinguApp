import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AsignacionActividadesService } from '../../../services/asignacion-actividades.service';
import { AlumnoAsignado } from '../../../shared/alumnoAsignado.interfaces';

@Component({
  selector: 'app-asignacion-agregar-alumno',
  templateUrl: './asignacion-agregar-alumno.page.html',
  styleUrls: ['./asignacion-agregar-alumno.page.scss'],
})
export class AsignacionAgregarAlumnoPage implements OnInit {

  alumnosCargados: any[] = [];
  alumnosPrecarga: any;
  textoBuscar: string = '';
  actividad: any;
  rutAlumno: any[] = [];
  nombreAlumno: any[] = [];
  imagenAlumno: any[] = [];
  colegioData: any [] = [];

  constructor(public router: Router,
              public auth: AuthService,
              public asignacionService: AsignacionActividadesService) { 

  }

  async ngOnInit() {
    this.actividad = await JSON.parse(localStorage.getItem('actividad'))
    let user = await this.auth.afAuth.currentUser;
    this.colegioData = await this.auth.obtenerColegio(user.uid);
    await this.obtenerAlumnos();
  }

  async obtenerAlumnos() {
    this.rutAlumno,this.alumnosCargados = await this.asignacionService.obtenerRutAlumnosAsignados(this.actividad,this.colegioData);
    this.alumnosPrecarga = await this.asignacionService.obtenerPrecargaUsuariosPorNivel(this.actividad.nivel,this.colegioData);
  }

  radioGroupChange(event, nombre: string, imagen:string) {
    if(event.detail.checked){
      var a = this.rutAlumno.indexOf(event.detail.value);
      if ( a === -1 ) {
        this.rutAlumno.push(event.detail.value);
        this.nombreAlumno.push(nombre);
        this.imagenAlumno.push(imagen);
      }      
    }else{
      var a = this.rutAlumno.indexOf(event.detail.value);
      if ( a !== -1 ) {
        this.rutAlumno.splice( a, 1 );
        this.nombreAlumno.splice( a, 1 );
        this.imagenAlumno.splice( a, 1 );
      }
    }
  }

  validando (rut) {
    
    var a = this.rutAlumno.indexOf(rut);

    if ( a != -1 ) {
      return true
    }else{
      return false
    }
  }
  
  validandoYaIngresado (rut) {
        
    var a = this.alumnosCargados.indexOf(rut);

    if ( a != -1 ) {
      return true
    }else{
      return false
    }
  }
  guardarAlumnos() {
    this.asignacionService.agregarAlumnos(this.actividad,this.rutAlumno,this.nombreAlumno,this.imagenAlumno);
    this.router.navigate(['/tablinks/asignacion/asignacion-actividad']);
  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }

}
