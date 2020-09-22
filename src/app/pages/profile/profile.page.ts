import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public isLogged = false;
  private user: User;
  public userName: string;
  public userNameTitle: string;
  constructor(public authService: AuthService) { }

   ngOnInit(){
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
    
    // this.user =  await this.authService.getCurremtUser();
    // this.userNameTitle = this.user.displayName;
  }

  // async editProfile(){
  //   this.authService.updateProfile(this.userName);
  // }

}
