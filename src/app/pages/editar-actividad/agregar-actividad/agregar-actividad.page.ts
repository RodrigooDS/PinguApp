import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsService } from '../../../services/tabs.service';
import { ActividadesService } from '../../../services/actividades.service';
import { Actividad } from '../../../shared/actividades.interfaces';

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
  editarActividad: string;
  cantidadItem: any;
  contenidoActividad : string;
  tituloActividad: string;
  tituloCategoria: string;
  id: string;
  nivel: string;

  constructor(public router: Router, 
              public tabEstado: TabsService,
              private route: ActivatedRoute,
              public actividadService: ActividadesService) { 
    this.tabEstado.cambiarEstado(true);
    this.cargarActividad();
  }

  async ngOnInit() {
    await this.obtenerCantidadItem();
    await this.cargarActividad();
    this.editarActividad = await this.route.snapshot.paramMap.get('editar');
  }

  async ionViewWillEnter() {
    await this.obtenerCantidadItem();
    await this.cargarActividad();
    this.editarActividad = await this.route.snapshot.paramMap.get('editar');
  }


  async guardar() {
    let dataActividad: Actividad;
    dataActividad = await JSON.parse(localStorage.getItem("actividad"));
    if(this.editarActividad){
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }else{
      await this.actividadService.crearActividad(dataActividad);
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }    
  }  

  async cancelar() {
    let dataActividad: Actividad
    
    dataActividad = await JSON.parse(localStorage.getItem("actividad"))

    if(this.editarActividad){
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }else{
      await this.actividadService.removerActividad(dataActividad);
      this.tabEstado.cambiarEstado(false);
      this.router.navigate(['/tablinks/editar-actividad']);
      localStorage.clear();
    }
  }

  obtenerCantidadItem() {
    this.actividadService.obtenerActividad(this.tituloActividad,this.tituloCategoria).subscribe(resp=>{this.cantidadItem = resp.length})
  }

  agregarAccion() {
    localStorage.removeItem('imagenes');
    this.router.navigate(['/tablinks/editar-actividad/cargar-actividad']);    
  }

  async cargarActividad() {
    this.json = await JSON.parse(localStorage.getItem('actividad'))
    this.tituloCategoria = this.json.categoria;
    this.tituloActividad = this.json.actividad;
    this.imagen = this.json.imagen;
    this.contenidoActividad = this.json.contenidoActividad;
    this.nivel = this.json.nivel;
  }

  // agregarImagenes() {
  //   var json = JSON.parse(localStorage.getItem('imagenes'));
  //   if(json){
  //     this.data.push(json);
  //     localStorage.setItem('data', JSON.stringify(this.data))
  //   }
  //   localStorage.removeItem('imagenes');
  // }

  // cargarImagenes(){
  //   var json = JSON.parse(localStorage.getItem('data'));
  //   if(json){
  //     for(var i in json) {
  //       this.data.push(json[i]);
  //     }
  //   }
  // }

  // eliminarImagen(file) {

  //   var json = JSON.parse(localStorage.getItem('data'));
  //   var index = this.data.indexOf(file);
  //    if (index !== -1) {
  //       json.splice(index, 1);
  //       this.data.splice(index, 1);
  //   }
  //   console.log(file)
  //   localStorage.setItem('data',JSON.stringify(json));
  //   this.upload.removerActividad(file,this.tituloActividad,this.tituloCategoria );
  // }

  // async guardarActividad() {
  //   try {
  //     //cuando es nuevo
  //     this.file = this.dataURLtoFile(this.imagen,this.nombreImagen);
  //     await this.upload.crearActividad(this.tituloCategoria, this.tituloActividad, this.file, this.nivel, this.interaccion).then( async (resp) => {
  //       for (var i = 0; i < this.data.length; i++){
  //           this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
  //           await this.upload.agregarActividad(this.data[i].nombreImagen,this.data[i].fraseIngles,this.tituloCategoria,this.tituloActividad,this.file);
  //       }
  //     });
  //   } catch (error) {
  //     //ya existe
  //     for (var i = 0; i < this.data.length; i++){
  //       if(!this.data[i].id){
  //         this.file = this.dataURLtoFile(this.data[i].imagen,this.data[i].nombreImagen);
  //         await this.upload.agregarActividad(this.data[i].nombreImagen,this.data[i].fraseIngles,this.tituloCategoria,this.tituloActividad,this.file);
  //       }
  //     }
  //   }
  // }

  // obtenerActividad() {
  //   this.actividadService.obtenerActividad(this.tituloActividad,this.tituloCategoria).subscribe(resp =>{ this.data = resp, console.log(resp)});  
  // }

  // obtenerActividadSoloImagenes() {
  //   this.actividadService.obtenerActividadSoloImagenes(this.tituloActividad,this.tituloCategoria).subscribe();
  // }

  // dataURLtoFile(dataurl, filename) {
 
  //   var arr = dataurl.split(','),
  //       mime = arr[0].match(/:(.*?);/)[1],
  //       bstr = atob(arr[1]), 
  //       n = bstr.length, 
  //       u8arr = new Uint8Array(n);
        
  //   while(n--){
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, {type:mime});
  // }

}
