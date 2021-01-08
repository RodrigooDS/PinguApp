import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formforgotpassword',
  templateUrl: './formforgotpassword.component.html',
  styleUrls: ['./formforgotpassword.component.scss'],
})
export class FormforgotpasswordComponent implements OnInit {

  form: FormGroup;

  @Output() onFormGroupChange = new EventEmitter<any>();

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.form = this.fb.group({
      email             : ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]]
    });
  }

  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }

  enviarDatos(){
    this.onFormGroupChange.emit(this.form.value);
  }
}
