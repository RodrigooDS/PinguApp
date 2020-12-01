import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Actividad } from '../../../shared/actividad.interfaces';
import { TabsService } from '../../../services/tabs.service';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.page.html',
  styleUrls: ['./agregar-actividad.page.scss'],
})
export class AgregarActividadPage implements OnInit {

  imagen : string;
  nombreImagen : string;
  json : any;
  file : any;
  loading: HTMLIonLoadingElement;
  data = [];

  tituloActividad: string;
  tituloCategoria: string;
  categorias: any[] = [];
  interaccion: string;
  imageURL: string;
  id: string;
  nivel: string;
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService,
              private loadingController: LoadingController,
              public tabEstado: TabsService) { 
    this.tabEstado.cambiarEstado(true);
    this.cargarRepaso();
    this.cargarImagenes();
    this.agregarImagenes();
    
    if(!localStorage.getItem('imagenes')){
      this.obtenerActividad();
    }
  }

  ngOnInit() {
    // localStorage.removeItem('data');
    this.cargarRepaso();
    this.agregarImagenes();
  }

  ionViewWillEnter(){
    this.cargarRepaso();
    this.agregarImagenes();
  }

  guardar() {
    this.guardarActividad();
    localStorage.clear();
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/editar-actividad']);
  }  

  cancelar() {
    localStorage.clear();
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/editar-actividad']);
  }

  agregarAccion() {
    localStorage.removeItem('imagenes');
    this.router.navigate(['/tablinks/editar-actividad/cargar-actividad']);    
  }

  agregarImagenes() {
    var json = JSON.parse(localStorage.getItem('imagenes'));
    if(json){
      this.data.push(json);
      localStorage.setItem('data', JSON.stringify(this.data))
    }
    localStorage.removeItem('imagenes');
  }

  cargarImagenes(){
    var json = JSON.parse(localStorage.getItem('data'));
    if(json){
      for(var i in json) {
        this.data.push(json[i]);
      }
    }
  }

  cargarRepaso() {
    this.json = JSON.parse(localStorage.getItem('actividad'))
    this.tituloCategoria = this.json.categoria;
    this.tituloActividad = this.json.actividad;
    this.imagen = this.json.imagen;
    this.nombreImagen = this.json.nombreImagen;
    this.nivel = this.json.nivel;
    this.interaccion = this.json.interaccion
  }

  eliminarImagen(file) {

    var json = JSON.parse(localStorage.getItem('data'));
    var index = this.data.indexOf(file);
     if (index !== -1) {
        json.splice(index, 1);
        this.data.splice(index, 1);
    }
    console.log(file)
    localStorage.setItem('data',JSON.stringify(json));
    this.upload.removerActividad(file,this.tituloActividad,this.tituloCategoria );
  }

  async guardarActividad() {
    try {
      //cuando es nuevo
      this.file = this.dataURLtoFile(this.imagen,this.nombreImagen);
      await this.upload.crearActividad(this.tituloCategoria, this.tituloActividad, this.file, this.nivel, this.interaccion).then( async (resp) => {
        for (var i = 0; i < this.data.length; i++){
            this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
            await this.upload.agregarActividad(this.data[i].nombreImagen,this.data[i].fraseIngles,this.tituloCategoria,this.tituloActividad,this.file);
        }
      });
    } catch (error) {
      //ya existe
      for (var i = 0; i < this.data.length; i++){
        if(!this.data[i].id){
          this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
          await this.upload.agregarActividad(this.data[i].nombreImagen,this.data[i].fraseIngles,this.tituloCategoria,this.tituloActividad,this.file);
        }
      }
    }
  }

  obtenerActividad() {
    this.upload.obtenerActividad(this.tituloActividad,this.tituloCategoria)
    .pipe(
      map( (resp : Actividad[] ) => resp.map ( ({id, detalle}) => ({id: id, imagen : detalle.imageUrl, nombreImagen: detalle.nombreImagen, fraseIngles: detalle.fraseIngles})))
    )
    .subscribe( resp => {
      this.data = resp;
      localStorage.setItem('data', JSON.stringify(this.data));
    });
    
  }

  dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

}
