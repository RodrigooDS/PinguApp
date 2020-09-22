import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  
  formRegistro : any  = '' 

  constructor(private auth: AuthService, 
              private router: Router) {}
         
  ngOnInit() {}
 
  async registro($event) {
    this.formRegistro = $event;
    try {
      const user = await this.auth.register(this.formRegistro.email, this.formRegistro.password, this.formRegistro);
      if (user) {
        // const isVerified = this.auth.isEmailVerified(user);
        // this.redirectUser(isVerified);
        this.router.navigate(['/tablinks']);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

}
