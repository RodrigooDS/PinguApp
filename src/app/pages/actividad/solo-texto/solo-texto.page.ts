import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { ContenidoActividad } from '../../../shared/contenido-actividad.interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-solo-texto',
  templateUrl: './solo-texto.page.html',
  styleUrls: ['./solo-texto.page.scss'],
})
export class SoloTextoPage implements OnInit {


  categoria: string;
  actividad: string;

  constructor(public upload: UploadService) {     
  
    var datos = JSON.parse(localStorage.getItem('actividad'));
    this.categoria = JSON.parse(localStorage.getItem('categoria'));
    this.actividad = datos.actividad;
  }

  ngOnInit() {
  }

}
