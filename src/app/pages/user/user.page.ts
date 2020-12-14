import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../shared/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {

  uid: string;
  nombre: string;
  imageUrl: string;

  constructor(private auth: AuthService,
              private router: Router) { 
    this.auth.usuario.subscribe(resp => {
      this.auth.obtenerUsuario(resp.uid).pipe(
        map( (resp: User) => resp)
      )
      .subscribe(
        resp => {
          // this.nombre = resp.displayName,
                this.imageUrl = resp.photoURL
        }
      );
    })
  }

  ngOnInit() {

  }

  editarPerfil() {
    this.router.navigate(['/tablinks/user/editar-perfil']);
  }



}
