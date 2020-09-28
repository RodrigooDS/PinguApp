import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//service
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {
  
  tituloActividad: string = '';
  tituloCategoria: string = '';
  actividades: any[] = [];
  imageURL: string;
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService) {
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  ionViewWillEnter() {
    this.tituloActividad = ''
    this.imageURL = '';
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase())
  }

  guardar() {
    this.upload.crearActividad(this.tituloCategoria,this.tituloActividad);
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso',{tittle: this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase()), category: this.tituloCategoria}],);
  }  

  cancelar() {
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  obtenerActividades() {
    this.upload.obtenerActividad(this.tituloCategoria).pipe(
      map( (resp : [] ) => resp.map ( ({actividad,id}) => ({titulo : actividad,id})))
    )
    .subscribe( resp => {
      this.actividades =resp;
      console.log(this.actividades);
    });
  }

  editarActividad(actividad: string,id: string) {
    localStorage.setItem('id', id);
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso',{tittle: actividad.replace(/\b\w/g, l => l.toUpperCase()), category: this.tituloCategoria}],);
  }

  cargarArchivo(event) {
    this.upload.chooseFile(event);

    const file = (event.target as HTMLInputElement).files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}

  

