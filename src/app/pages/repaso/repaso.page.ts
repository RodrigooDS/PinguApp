import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { Categoria } from '../../shared/categoria.interfaces';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  categorias : any[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.obtenerCategoria();
  }

  obtenerCategoria (){ 
    
    this.authService.obtenerCategorias().pipe(
      map( (resp: Categoria[]) => resp.map(({nombreCategoria}) => ({categoria: nombreCategoria})))
    )
    .subscribe( resp =>{
      
      this.categorias = resp
      console.log(this.categorias);

    });
  }   
}
