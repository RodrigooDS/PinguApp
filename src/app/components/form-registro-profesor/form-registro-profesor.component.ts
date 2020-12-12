import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validate } from 'rut.js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-registro-profesor',
  templateUrl: './form-registro-profesor.component.html',
  styleUrls: ['./form-registro-profesor.component.scss'],
})
export class FormRegistroProfesorComponent implements OnInit {

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
      tipoUsuario       : ['profesor']
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
