import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  doLogin()
  {
    this.authService.login(this.email, this.password).then( () =>{
      this.router.navigate(['/home']);
      console.log(this.email);
    }).catch(err => {
      alert('los datos son incorrectos o no existe el usuario');
      //Agregar un toast 
    })
  }
}
