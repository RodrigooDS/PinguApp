import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

 
  usuario = {
    email: '',
    password: ''
  };
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  async onLogin()
  {
    try{ 

      const user = await this.authService.login(this.usuario.email, this.usuario.password);
      console.log(user);
      if(user){
        this.router.navigate(['/tablinks']);
      }
    }catch(error){
      console.log(error);
    }
  }
}
