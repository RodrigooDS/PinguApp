import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from '../../../services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-repaso',
  templateUrl: './cargar-repaso.page.html',
  styleUrls: ['./cargar-repaso.page.scss'],
})
export class CargarRepasoPage implements OnInit {

  selectedFile: any;
  tituloEspanol: string;
  tituloIngles: string;

  items: Observable<any[]>;

  constructor(public upload: UploadService, public router: Router) { 
    this.items = this.upload.obtenerImagenes();
    this.items.subscribe();
  }

  ngOnInit() {
  }

  cancelar(){
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
  }

  elegirArchivo (event) {
    this.upload.chooseFile(event);
  }

  subirArchivo(){
    // this.upload.addTodo(this.tituloEspanol,this.tituloIngles);
    this.upload.test();
    // this.items = this.upload.obtenerImagenes();
    // this.items.subscribe();
  }

  eliminarArchivo(){

  }
}
