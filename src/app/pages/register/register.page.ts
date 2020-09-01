import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuarioRegistro = {

      email:'',
      nombreEstudiante:'',
      apellidoEstudiante:'',
      nombreApoderado:'',
      apellidoApoderado:'',
      password:''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

}
