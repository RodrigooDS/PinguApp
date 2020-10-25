import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})

export class LoginPage implements OnInit {

  formRegistro : any  = '' 
  
  constructor(private authService: AuthService, 
              private router: Router,
              private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    
  }

  async login($event){
    this.formRegistro = $event;
    try{ 
      const user = await this.authService.login(this.formRegistro.email, this.formRegistro.password);
      if(user){
        this.router.navigate(['/tablinks']);
        this.menuCtrl.enable(true);
      }
    }catch(error){
      console.log(error);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
}
