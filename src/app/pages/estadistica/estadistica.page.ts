import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../../services/estadistica.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  alumnos: any;
  textoBuscar: string = '';
  colegioData: any [] = [];

  constructor(private estadistica: EstadisticaService,
              private router: Router,
              public auth: AuthService) {
    localStorage.clear();
  }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser;
    this.colegioData = await this.auth.obtenerColegio(user.uid);
    await this.obtenerAlumnos();
  }

  obtenerAlumnos() {
    this.estadistica.obtenerPrecargaUsuariosFiltrados("alumno",this.colegioData).subscribe(resp => {this.alumnos = resp})
  }

  estadisticaPorActividad (uid: string) {
    localStorage.setItem('user',uid);
    this.router.navigate(['/tablinks/estadistica/ver-estadistica']);
  }

  onSearchChange( event ) {
    this.textoBuscar = event.detail.value;
  }
}
