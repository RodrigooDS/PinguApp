import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  
              
  ngOnInit(){
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombreEstudiante: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidoEstudiante: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      nombreApoderado: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidoApoderado: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      password: ['', [Validators.required,Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    //   // company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    //   // email: ['', [Validators.required, Validators.email]],
    //   // age: ['', [Validators.required]],
    //   // url: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
    //   // password: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    });
    
  }
 
  saveData(){
    console.log(this.myForm.value)
  }

}
