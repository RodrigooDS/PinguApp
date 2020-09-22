import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  formRestablecer : any  = '' 

  constructor(private auth: AuthService, 
              private router: Router,
              private menuCtrl: MenuController) {}

  ngOnInit() {
  }

  async restablecerPassword($event) {
    this.formRestablecer = $event;
    console.log(this.formRestablecer.email)
    try {
      await this.auth.resetPassword(this.formRestablecer.email);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
}
