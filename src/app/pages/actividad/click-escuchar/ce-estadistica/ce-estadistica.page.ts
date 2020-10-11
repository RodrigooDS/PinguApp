import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ce-estadistica',
  templateUrl: './ce-estadistica.page.html',
  styleUrls: ['./ce-estadistica.page.scss'],
})
export class CeEstadisticaPage implements OnInit {

  
  @Input() buena;
  @Input() parcial;
  @Input() error;
  @Input() errores;

  constructor(private modalCtrl: ModalController, 
              private navParams:NavParams) { }

  ngOnInit() {
    
    this.buena = this.navParams.get('buena');
    this.parcial = this.navParams.get('parcial');
    this.error = this.navParams.get('error');
    this.errores = this.navParams.get('errores');

  }

  menuPrincipal(){
    this.modalCtrl.dismiss();
  }

  reintentar(){


  }



}
