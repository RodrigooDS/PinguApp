import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../shared/user.interface';
import { Router } from '@angular/router';
import { TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {

  uid: string;
  nombre: string;

  constructor(private auth: AuthService,
              private router: Router) { 
    this.auth.usuario.subscribe(resp => {
      this.auth.obtenerUsuario(resp.uid).pipe(
        map( (resp: User) => resp)
      )
      .subscribe(
        resp => this.nombre = resp.displayName
      );
    })
  }

  ngOnInit() {

  }

  editarPerfil() {
    this.router.navigate(['/tablinks/user/editar-perfil']);
  }

}
