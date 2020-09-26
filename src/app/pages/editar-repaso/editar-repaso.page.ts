import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Categoria } from '../../shared/categoria.interfaces';
import { map } from 'rxjs/operators';
import { UploadService } from '../../services/upload.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-repaso',
  templateUrl: './editar-repaso.page.html',
  styleUrls: ['./editar-repaso.page.scss'],
})
export class EditarRepasoPage implements OnInit {

  tipoCategoria : string;
  tituloImagen: string;
  categorias : any[] = [];
  // ocultar: string = "0";

  selectedFile: any;

  items: Observable<any[]>;
    
  
  constructor(public authService: AuthService, public router: Router) { 
  }

  ngOnInit() {
    this.obtenerCategoria();
  }

  obtenerCategoria (){ 
    
    this.authService.obtenerCategorias().pipe(
      map( (resp: Categoria[]) => resp.map(({nombreCategoria}) => ({categoria: nombreCategoria})))
    )
    .subscribe( resp =>{
      this.categorias = resp
    });
  } 
  
  obtenerTituloCategoria(categoria) {
    this.tipoCategoria = categoria
    // console.log(this.tipoCategoria)
    this.router.navigate(['/tablinks/editar-repaso/repaso',{category: this.tipoCategoria}]);
  }
  
  
}
