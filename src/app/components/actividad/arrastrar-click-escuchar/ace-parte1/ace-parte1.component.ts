import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../../../../services/upload.service';
import { VoiceService } from '../../../../services/voice.service';
import { Platform } from '@ionic/angular';
import { Actividad } from '../../../../shared/actividad.interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ace-parte1',
  templateUrl: './ace-parte1.component.html',
  styleUrls: ['./ace-parte1.component.scss'],
})
export class AceParte1Component implements OnInit {

  @Input() tituloActividad: string;

  actividad: any[] = [];
  imageUrl: string;
    
  constructor(public upload: UploadService,
              public voice:  VoiceService,
              public platform: Platform) { 
    
  }

  ngOnInit() {
    this.obtenerDatosActividad();
  }

  obtenerDatosActividad() {
    this.upload.obtenerActividad(this.tituloActividad)
    .pipe(
      map( (resp : Actividad[] ) => resp.map ( ({id, detalle}) => ({id, detalle})))
    )
    .subscribe( resp => {
      this.actividad = resp;
      setTimeout(() => {
        this.frutasAleatoria();
      }, 500);
    });
  }

  frutasAleatoria(){
    var random = Math.floor(Math.random()*(this.actividad.length));
    this.imageUrl = this.actividad[random].detalle.imageUrl;
  }
}
