import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validate, clean, format } from 'rut.js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-registro-alumno',
  templateUrl: './form-registro-alumno.component.html',
  styleUrls: ['./form-registro-alumno.component.scss'],
})
export class FormRegistroAlumnoComponent implements OnInit {

  @Output() onFormGroupChange = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              public alertController: AlertController) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.form = this.fb.group({
      nombre            : ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      apellidoPaterno   : ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      apellidoMaterno   : ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      rut               : ['', [Validators.required, Validators.pattern('[0-9]{7,8}-[0-9Kk]{1}')]],
      fechaNacimiento   : ['', [Validators.required]],
      // rut               : ['', [Validators.required, Validators.pattern('(^[0-9]{1,2}\.[0-9]{1,3}\.[0-9]{1,3}\-[0-9k]{1}$)')]],
    });
  }

  get nombreNoValido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched
  }

  get apellidoPaternoNoValido(){
    return this.form.get('apellidoPaterno').invalid && this.form.get('apellidoPaterno').touched
  }

  get apellidoMaternoNoValido(){
    return this.form.get('apellidoMaterno').invalid && this.form.get('apellidoMaterno').touched
  }

  get rutNoValido(){
    return this.form.get('rut').invalid && this.form.get('rut').touched
  }

  validarRut(){
    return validate(this.form.value.rut);
  }
  
  enviarDatos(){
    if(this.validarRut()){
      this.onFormGroupChange.emit(this.form.value);
    }else{
      this.alertaRutNoValido();
    }
  }

  async alertaRutNoValido() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      mode: 'ios',
      message: 'El rut ingresado no es válido.',
      buttons: ['Cerrar']
    });

    await alert.present();
  }

}
