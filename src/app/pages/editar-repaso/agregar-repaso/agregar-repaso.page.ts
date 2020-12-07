import { Repaso } from './../../../shared/repaso.interfaces';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

//interfaces
// import { UploadService } from '../../../services/upload.service';
import { LoadingController } from '@ionic/angular';
import { TabsService } from '../../../services/tabs.service';


@Component({
  selector: 'app-agregar-repaso',
  templateUrl: './agregar-repaso.page.html',
  styleUrls: ['./agregar-repaso.page.scss'],
})
export class AgregarRepasoPage implements OnInit {

  imagen : string;
  nombreImagen : string;
  json : any;
  file : any;
  loading: HTMLIonLoadingElement;
  data = [];

  tituloActividad: string;
  tituloCategoria: string;
  categorias: any[] = [];
  // imageURL: string;
  id: string;
  nivel: string;
  constructor(public router: Router, 
              private route: ActivatedRoute,
              // public upload: UploadService,
              public loadingCtrl: LoadingController,
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
    this.cargarRepaso();
    this.agregarImagenes();
  }

  ionViewWillEnter(){
    this.cargarRepaso();
    this.agregarImagenes();
  }

  guardar() {
    this.tabEstado.cambiarEstado(false);
    this.guardarRepaso();
    localStorage.clear();
    this.router.navigate(['/tablinks/editar-repaso']);
  }  

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    localStorage.clear();
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  agregarAccion() {
    localStorage.removeItem('imagenes');
    this.router.navigate(['/tablinks/editar-repaso/cargar-repaso']);    
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
    this.json = JSON.parse(localStorage.getItem('repaso'))
    this.tituloCategoria = this.json.categoria;
    this.tituloActividad = this.json.actividad;
    this.imagen = this.json.imagen;
    this.nombreImagen = this.json.nombreImagen;
    this.nivel = this.json.nivel;
  }

  eliminarImagen(file) {

    var json = JSON.parse(localStorage.getItem('data'));
    var index = this.data.indexOf(file);
     if (index !== -1) {
        json.splice(index, 1);
        this.data.splice(index, 1);
    }
    localStorage.setItem('data',JSON.stringify(json));
    // this.upload.removerRepaso(file,this.tituloActividad);
  }

  async guardarRepaso() {
    // try {
    //   //cuando es nuevo
    //   this.file = this.dataURLtoFile(this.imagen,this.nombreImagen);
    //   await this.upload.crearRepaso(this.tituloCategoria, this.tituloActividad, this.file, this.nivel).then( async (resp) => {
    //     for (var i = 0; i < this.data.length; i++){
    //         this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
    //         await this.upload.agregarRepaso(this.data[i].nombreEspanol,this.data[i].nombreIngles,this.tituloCategoria,this.tituloActividad,this.file)
    //       }
    //   });
      
    // } catch (error) {
    //   //ya existe
    //   for (var i = 0; i < this.data.length; i++){
    //     if(!this.data[i].id){
    //       this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
    //       await this.upload.agregarRepaso(this.data[i].nombreEspanol,this.data[i].nombreIngles,this.tituloCategoria,this.tituloActividad,this.file);
    //     }
    //   }
    // }
  }

  obtenerActividad() {
    // this.upload.obtenerRepaso(this.tituloActividad,this.tituloCategoria)
    // .pipe(
    //   map( (resp : Repaso[] ) => resp.map ( ({id, detalle}) => ({id: id,imagen : detalle.imageUrl, nombreIngles: detalle.nombreIngles, nombreEspanol: detalle.nombreEspanol})))
    // )
    // .subscribe( resp => {
    //   this.data = resp;
    //   localStorage.setItem('data', JSON.stringify(this.data));
    // });
    
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
