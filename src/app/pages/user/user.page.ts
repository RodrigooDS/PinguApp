import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ObtenerActivadesService } from 'src/app/services/obtener-activades.service';
import { AsignacionActividadesService } from 'src/app/services/asignacion-actividades.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {

  usuario: any[] = [];
  tipoUsuario: string;
  actividades: any[] = [];
  cantidadActividades : number;

  constructor(private auth: AuthService,
              private actividadesService: ObtenerActivadesService,
              private asignacionService: AsignacionActividadesService,
              private router: Router) {  }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser;
    this.auth.obtenerUsuario(user.uid).subscribe(resp => {this.usuario = resp});
    this.obtenerTipoUsuario(user.uid)
    let rut = await this.asignacionService.obtenerAlumnoAsignadoPorUid(user.uid);
    this.obtenerActividades(rut,user.uid);
  }

  editarPerfil() {
    this.router.navigate(['/tablinks/user/editar-perfil']);
  }

  async obtenerTipoUsuario(uid: any) {
    this.tipoUsuario = await this.auth.obtenerTipoDeUsuario(uid);
  }

  obtenerActividades(rut: string, uid: string) {
    if(this.tipoUsuario == "alumno"){
      this.asignacionService.obtenerTodasLasActividadesPorRut(rut).subscribe(resp => {this.actividades = resp, this.cantidadActividades = resp.length});
    }else{
      this.actividadesService.obtenerActividadesCreadasPorProfesor(uid).subscribe(resp=> {this.actividades = resp, this.cantidadActividades = resp.length});
    }
  }
}
