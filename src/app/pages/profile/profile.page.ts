import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public isLogged = false;
  public user: any;
  constructor(public authService: AuthService) { }

   ngOnInit(): void {
    // this.user =  await this.authService.getCurremtUser();
    // if(this.user){
    //   this.isLogged = true;
    //   console.log('User ->', this.user);
    // }else{
    //   console.log("error de log");
    // }
    this.usuario();
    
  }
  ionViewWillEnter(){
    this.usuario();
  }

  async usuario(){
    
    this.user =  await this.authService.getCurremtUser();
    if(this.user){
      console.log('User ->', this.user.email);
    }

  }
}
