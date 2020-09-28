import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargar-repaso',
  templateUrl: './cargar-repaso.page.html',
  styleUrls: ['./cargar-repaso.page.scss'],
})
export class CargarRepasoPage implements OnInit {

  selectedFile: any;
  tituloEspanol: string;
  tituloIngles: string;
  tituloActividad: string;
  tituloCategoria: string;

  // items: Observable<any[]>;
  imageURL: string;

  constructor(public upload: UploadService, public router: Router, private route: ActivatedRoute) { 
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloActividad = this.route.snapshot.paramMap.get('tittle');

  }

  ngOnInit() {
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.tituloActividad = this.route.snapshot.paramMap.get('tittle');
  }

  cancelar(){
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
  }
  
  subirArchivo(){
    let id = localStorage.getItem('id');
    console.log(id);
    this.upload.addTodo(this.tituloEspanol.replace(/\b\w/g, l => l.toUpperCase()),
                        this.tituloIngles.replace(/\b\w/g, l => l.toUpperCase()),
                        this.tituloCategoria,
                        this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase()),
                        id);

  }

  eliminarArchivo(){

  }

  cargarArchivo(event) {
    this.upload.chooseFile(event);

    const file = (event.target as HTMLInputElement).files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      // localStorage.setItem(this.tituloEspanol, this.imageURL);
    }
    reader.readAsDataURL(file)
  }
}
