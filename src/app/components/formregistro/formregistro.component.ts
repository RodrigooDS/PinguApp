import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formregistro',
  templateUrl: './formregistro.component.html',
  styleUrls: ['./formregistro.component.scss'],
})
export class FormregistroComponent implements OnInit {

  @Output() onFormGroupChange = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
    
  }
  
  crearFormulario(){
    this.form = this.fb.group({
      email             : ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      nombreEstudiante  : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      password          : ['', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})')]],
    });
  }

  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  get nombreEstudianteNoValido(){
    return this.form.get('nombreEstudiante').invalid && this.form.get('nombreEstudiante').touched
  }

  get passwordNoValido(){
    return this.form.get('password').invalid && this.form.get('password').touched
  }

  enviarDatos(){
    this.onFormGroupChange.emit(this.form.value);
  }
}
