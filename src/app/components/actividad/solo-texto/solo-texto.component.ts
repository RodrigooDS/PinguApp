import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { map } from 'rxjs/operators';
import { ContenidoActividad } from '../../../shared/contenido-actividad.interfaces';

@Component({
  selector: 'app-solo-texto-component',
  templateUrl: './solo-texto.component.html',
  styleUrls: ['./solo-texto.component.scss'],
})
export class SoloTextoComponent implements OnInit {

  @Input() tituloActividad: string;
  @Input() tituloCategoria: string;

  actividad: any[] = [];

  constructor(public upload: UploadService) { }

  ngOnInit() {
    this.obtenerDatosActividad();
  }

  obtenerDatosActividad() {
    this.upload.obtenerActividad(this.tituloActividad,this.tituloCategoria).pipe( 
      map( (resp : ContenidoActividad[] ) => resp.map ( ({id, correcta, pregunta, imagenes}) => ({id, correcta, pregunta, imagenes})))
    )
    .subscribe( resp => {
      this.actividad = resp;
      setTimeout(() => {
        console.log(this.actividad);
      }, 500);
    });
  }
}
