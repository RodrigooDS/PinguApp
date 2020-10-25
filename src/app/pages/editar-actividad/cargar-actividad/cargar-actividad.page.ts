import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargar-actividad',
  templateUrl: './cargar-actividad.page.html',
  styleUrls: ['./cargar-actividad.page.scss'],
})
export class CargarActividadPage implements OnInit {

  imagen : string;
  nombreImagen : string;
  fraseIngles: string;
  imageURL: string;
  json : any;
  file : any;
  data = [];

  selectedFile: any;
  // tituloIngles: string;

  constructor(public upload: UploadService, 
              public router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  agregarRepaso(){
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
  }
  
  subirArchivo(){
    var json = {  id               : '',
                  nombreImagen     : this.nombreImagen,
                  fraseIngles      : this.fraseIngles,
                  imagen           : this.imageURL,
    }
    localStorage.setItem('imagenes',JSON.stringify(json));  
  }

  cargarArchivo(event) {
    const file = (event.target as HTMLInputElement).files[0];
    // this.nombreImagen = event.target.files[0].name
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

}
