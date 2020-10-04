import { Component, Input, OnInit } from '@angular/core';
import { Actividad } from '../../../../shared/actividad.interfaces';
import { UploadService } from '../../../../services/upload.service';
import { VoiceService } from '../../../../services/voice.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.scss'],
})
export class AsociacionComponent implements OnInit {

  @Input() tituloActividad: string;
  
  actividad: any[] = [];
  datos: Actividad[] = [];
  numero: number;
  constructor(public upload: UploadService,
              public voice:  VoiceService) { }

  ngOnInit() {
    this.obtenerDatosActividad();
  }

  obtenerDatosActividad() {
    this.upload.obtenerActividad(this.tituloActividad).pipe(
      map( (resp : Actividad[] ) => resp.map ( ({id, detalle}) => ({id, detalle})))
    )
    .subscribe( resp => {
      this.datos = resp;
      // this.tiempo();
      // console.log(this.actividad);
    });
  }

  // tiempo(){
  //   var a = {};
  //   for(let i = 0; i < this.actividad.length; i++){
  //     let item = this.actividad[i];
  //     setTimeout(() => {
  //       this.datos.push(item);
  //     }, 500*(i+1));
  //   }

  // }

  onClick(item) {
    this.numero = item;
  }

  hablar(texto: string) { 
    this.voice.hablar(texto);
  }

}
