import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { validate, clean, format } from 'rut.js';

@Component({
  selector: 'app-formregistro',
  templateUrl: './formregistro.component.html',
  styleUrls: ['./formregistro.component.scss'],
})
export class FormregistroComponent implements OnInit {

  @Output() onFormGroupChange = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              public alertController: AlertController) { }

  ngOnInit() {
    this.crearFormulario();
  }
  
  crearFormulario(){
    this.form = this.fb.group({
      email             : ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password          : ['', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})')]],
      rut               : ['', [Validators.required, Validators.pattern('[0-9]{7,8}-[0-9Kk]{1}')]],
    });
  }

  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  get passwordNoValido(){
    return this.form.get('password').invalid && this.form.get('password').touched
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
