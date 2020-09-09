import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  formRegistro :any  = '' 
  constructor() {}
  
              
  ngOnInit(){
      
  }
 
  public onFormGroupChangeEvent(_event) {
    this.formRegistro = _event;
    console.log(this.formRegistro.email)
  }

}
