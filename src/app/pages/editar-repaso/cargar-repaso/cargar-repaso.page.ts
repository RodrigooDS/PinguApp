import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargar-repaso',
  templateUrl: './cargar-repaso.page.html',
  styleUrls: ['./cargar-repaso.page.scss'],
})
export class CargarRepasoPage implements OnInit {

  imagen : string;
  nombreImagen : string;
  json : any;
  file : any;
  data = [];

  selectedFile: any;
  tituloEspanol: string;
  tituloIngles: string;

  imageURL: string;

  constructor(public upload: UploadService, 
              public router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  agregarRepaso(){
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
  }
  
  subirArchivo(){
    var json = {  id               :'',
                  nombreEspanol    : this.tituloEspanol,
                  nombreIngles     : this.tituloIngles,
                  imagen           : this.imageURL,
                  // nombreImagen     : this.nombreImagen
    }
    console.log('json',json);
    localStorage.setItem('imagenes',JSON.stringify(json));
  }

  eliminarArchivo(){

  }

  cargarArchivo(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.nombreImagen = event.target.files[0].name
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
