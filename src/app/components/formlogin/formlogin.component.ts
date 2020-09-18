import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formlogin',
  templateUrl: './formlogin.component.html',
  styleUrls: ['./formlogin.component.scss'],
})
export class FormloginComponent implements OnInit {

  form: FormGroup;

  @Output() onFormGroupChange = new EventEmitter<any>();

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.form = this.fb.group({
      email             : ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password          : ['', [Validators.required, Validators.pattern((/^[a-z0-9_-]{6,18}$/))]],
    });
  }

  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  get passwordNoValido(){
    return this.form.get('password').invalid && this.form.get('password').touched
  }

  enviarDatos(){
    
    this.onFormGroupChange.emit(this.form.value);
  }

}
