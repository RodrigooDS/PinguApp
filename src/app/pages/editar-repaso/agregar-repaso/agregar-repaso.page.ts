import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

//interfaces
import { UploadService } from '../../../services/upload.service';
import { LoadingController } from '@ionic/angular';
import { Actividad } from '../../../shared/actividad.interfaces';

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
  imageURL: string;
  id: string;
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService,
              private loadingController: LoadingController) { 
    this.cargarRepaso();
    this.cargarImagenes();
    this.agregarImagenes();
    if(!localStorage.getItem('imagenes')){
      this.obtenerActividad();
    }
  }

  ngOnInit() {
    this.cargarRepaso();
    // this.cargarImagenes();
    this.agregarImagenes();
    // if(!localStorage.getItem('imagenes')){
    //   this.obtenerActividad();
    // }
  }

  ionViewWillEnter(){
    this.cargarRepaso();
    // this.cargarImagenes();
    this.agregarImagenes();
    // if(!localStorage.getItem('imagenes')){
    //   this.obtenerActividad();
    // }
  }

  guardar() {
    this.guardarRepaso();
    localStorage.clear();
    this.router.navigate(['/tablinks/editar-repaso']);
  }  

  cancelar() {
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
      // console.log(this.data);
    }
    localStorage.removeItem('imagenes');
  }

  cargarImagenes(){
    var json = JSON.parse(localStorage.getItem('data'));
    if(json){
      for(var i in json) {
        this.data.push(json[i]);
    }
      // console.log(this.data);
    }
  }

  cargarRepaso() {
    this.json = JSON.parse(localStorage.getItem('repaso'))
    this.tituloCategoria = this.json.categoria;
    this.tituloActividad = this.json.actividad;
    this.imagen = this.json.imagen;
    this.nombreImagen = this.json.nombreImagen;
  }

  eliminarImagen(file) {

    var json = JSON.parse(localStorage.getItem('data'));
    var index = this.data.indexOf(file);
    // console.log(item, file,index);
     if (index !== -1) {
        json.splice(index, 1);
        this.data.splice(index, 1);
    }
    // console.log('datos',this.data);
    localStorage.setItem('data',JSON.stringify(json));
    this.upload.remove(file,this.tituloActividad);
    // // intentar
    // try {
      
    //   this.upload.remove(file,this.tituloActividad);
    // } catch (error) {
    //   console.log(error);
    // } 
    
  }

  async guardarRepaso() {
    // await this.presentLoading();
    try {
      //cuando es nuevo
      this.file = this.dataURLtoFile(this.imagen,this.nombreImagen);
      await this.upload.crearActividad(this.tituloCategoria,this.tituloActividad,this.file).then( async (resp) => {
        for (var i = 0; i < this.data.length; i++){
            this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
            await this.upload.agregarData(this.data[i].nombreEspanol,this.data[i].nombreIngles,this.tituloCategoria,this.tituloActividad,this.file)
          }
      });
    } catch (error) {
      //ya existe
      for (var i = 0; i < this.data.length; i++){
        if(!this.data[i].id){
          this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
          await this.upload.agregarData(this.data[i].nombreEspanol,this.data[i].nombreIngles,this.tituloCategoria,this.tituloActividad,this.file);
        }
      }
      // console.log(error);
    }
  }

  obtenerActividad() {
    this.upload.obtenerActividad(this.tituloActividad)
    .pipe(
      map( (resp : Actividad[] ) => resp.map ( ({id, detalle}) => ({id: id,imagen : detalle.imageUrl, nombreIngles: detalle.nombreIngles, nombreEspanol: detalle.nombreEspanol})))
    )
    .subscribe( resp => {
      this.data = resp;
      localStorage.setItem('data', JSON.stringify(this.data));
      // console.log(resp);
    });
    
  }

  //pueder ser un service
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
