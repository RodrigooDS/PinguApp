import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})

export class LoginPage implements OnInit {

  formRegistro : any  = '' 
  
  constructor(private authService: AuthService, 
              private router: Router) {
  }

  ngOnInit() {
    
  }

  async login($event){
    this.formRegistro = $event;
    try{ 
      const user = await this.authService.login(this.formRegistro.email, this.formRegistro.password);
      if(user){
        this.router.navigate(['/tablinks']);
      }
    }catch(error){
      console.log(error);
    }
  }  
}
