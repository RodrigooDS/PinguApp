import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  formRestablecer : any  = '' 

  constructor(private auth: AuthService, 
              private router: Router) {}

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
  //(onFormGroupChange)="registro($event)"

}
