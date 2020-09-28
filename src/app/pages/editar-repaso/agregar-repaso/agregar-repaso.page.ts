import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

//interfaces
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-agregar-repaso',
  templateUrl: './agregar-repaso.page.html',
  styleUrls: ['./agregar-repaso.page.scss'],
})
export class AgregarRepasoPage implements OnInit {

  tituloActividad: string;
  tituloCategoria: string;
  categorias: any[] = [];
  imageURL: string;
  id: string;
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService) { 
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloActividad = this.route.snapshot.paramMap.get('tittle');
    this.imageURL = localStorage.getItem('imagenActividad');
    this.id = localStorage.getItem('id');
  }

  ngOnInit() {
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloActividad = this.route.snapshot.paramMap.get('tittle');
    this.obtenerDatos()
  }

  guardar() {
    this.router.navigate(['/tablinks/editar-repaso']);
  }  

  cancelar() {
    localStorage.clear();
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  agregarImagen() {
    this.router.navigate(['/tablinks/editar-repaso/cargar-repaso',{tittle: this.tituloActividad, category: this.tituloCategoria}]);    
  }

  obtenerDatos() {
    this.upload.obtenerImagenes(this.tituloCategoria,this.tituloActividad,this.id).pipe(
      map( (resp: []) => resp.map( ({actividad, categoria, id, detalle}) => ({actividad, categoria, id, detalle}) ) )
    )
    .subscribe(resp => {
      this.categorias = resp;
      console.log(this.categorias);
    }
    );
  }

  eliminarImagen(item) {
    this.upload.remove(item,this.id,this.tituloActividad);
    this.obtenerDatos();
  }
}
