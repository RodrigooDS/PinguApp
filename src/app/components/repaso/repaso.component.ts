import { Component, Input, OnInit } from '@angular/core';
import { RepasosService } from '../../services/repasos.service';
import { VoiceService } from '../../services/voice.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.component.html',
  styleUrls: ['./repaso.component.scss'],
})
export class RepasoComponent implements OnInit {

  @Input() actividadRepaso: string;
  @Input() categoriaRepaso: string;

  data: any[] = [];
  nombresEspanol: any[] = [];
  nombresIngles: any[] = [];
  imagenes: any[] = [];

  nombreEspanol: string;
  nombreIngles: string;




  constructor(
    public repaso: RepasosService,
    public voice:  VoiceService,
  ) { 

  }
  

ngOnInit() {

    this.obtenerContenidoRepaso();
    
  }

  async obtenerContenidoRepaso(){

    this.data = await this.repaso.obtenerRepasoActividad(this.actividadRepaso, this.categoriaRepaso); 

    for(let i=0; i< this.data.length;i++){
      this.nombresEspanol.push(this.data[i].nombreEspanol);
      this.nombresIngles.push(this.data[i].nombreIngles);
      this.imagenes.push(this.data[i].imagen);
  }

  }

  hablarPalabra(texto){
    this.voice.hablar(texto);
  }

}
