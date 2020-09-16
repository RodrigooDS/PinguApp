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
      apellidoEstudiante: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      nombreApoderado   : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellidoApoderado : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      password          : ['', [Validators.required, Validators.pattern((/^[a-z0-9_-]{6,18}$/))]],
    });
  }

  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  get nombreEstudianteNoValido(){
    return this.form.get('nombreEstudiante').invalid && this.form.get('nombreEstudiante').touched
  }

  get apelldioEstudianteNoValido(){
    return this.form.get('apellidoEstudiante').invalid && this.form.get('apellidoEstudiante').touched
  }

  get nombreApoderadoNoValido(){
    return this.form.get('nombreApoderado').invalid && this.form.get('nombreApoderado').touched
  }

  get apelldioApoderadoNoValido(){
    return this.form.get('apellidoApoderado').invalid && this.form.get('apellidoApoderado').touched
  }

  get passwordNoValido(){
    return this.form.get('password').invalid && this.form.get('password').touched
  }

  saveData(){
    //console.log(this.myForm.value)
    // this.onFormGroupChange.emit(this.myForm);
  }

  enviarFormulario(){
    // console.log(this.myForm.value)
    this.onFormGroupChange.emit(this.form.value);
  }
}
