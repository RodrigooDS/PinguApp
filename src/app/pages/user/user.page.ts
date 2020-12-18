import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})

export class UserPage implements OnInit {

  usuario: any[] = [];

  constructor(private auth: AuthService,
              private router: Router) {  }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser
    this.auth.obtenerUsuario(user.uid).subscribe(resp => {this.usuario = resp})
  }

  editarPerfil() {
    this.router.navigate(['/tablinks/user/editar-perfil']);
  }



}
