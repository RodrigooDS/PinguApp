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
      password          : ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{6,}')]],
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

  enviarDatos(){
    // console.log(this.myForm.value)
    this.onFormGroupChange.emit(this.form.value);
  }
}
