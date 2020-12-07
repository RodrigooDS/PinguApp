import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsService } from '../../../services/tabs.service';
import { PhotoCameraService } from 'src/app/services/photo-camera.service';
import { AlertController } from '@ionic/angular';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

  imageFile: File;
  imageCamera: any;
  imageUrl: string;
 
  filename: string;
  tituloActividad: string;
  tituloCategoria: string;
  nivel : string;
  tipoActividad : string;
  contenidoActividad : string;
  // Contenido que devulve Firebase
  data: any[] = [];
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public actividadService: ActividadesService,
              public tabEstado: TabsService,
              public photoService: PhotoCameraService,
              public alertController: AlertController) {

    this.imageUrl = "";
    this.tituloActividad = "";
    this.tipoActividad = "";
    this.contenidoActividad = "";
    this.tabEstado.cambiarEstado(true);
    // this.obtenerActividades();
  }

  ngOnInit() {
    this.imageUrl = "";
    this.tituloActividad = "";
    this.tipoActividad = "";
    this.contenidoActividad = "";
    this.tabEstado.cambiarEstado(true);
    this.obtenerActividades();
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase())
  }

  obtenerNivel(nivel) {
    this.nivel = nivel;
  }

  obtenerTipoActividad(interaccion) {
    this.tipoActividad = interaccion;
  }

  obtenerContenidoActividad(interaccion) {
    this.contenidoActividad = interaccion;
  }

  // Obtener las actidades desde Firebase en tiempo real
  async obtenerCategoria() {
    this.tituloCategoria = await this.route.snapshot.paramMap.get('category');
  }

  // Guarda la actividad en el localStorage
  async guardar() {
    let existenciaActividad : boolean;
    // El obtenerExistenciaDeActividad funciona pasar el nuevo service
    existenciaActividad = await this.actividadService.obtenerExistenciaDeActividad(this.tituloActividad,this.tituloCategoria);
    if(existenciaActividad){
      this.errorCreacionAlerta();
    }else{
      var json = {
        categoria    : this.tituloCategoria,
        actividad    : this.tituloActividad,
        imagen       : this.imageCamera.dataUrl,
        nombreImagen : this.filename,
        nivel        : this.nivel,
        tipoActividad  : this.tipoActividad,
        contenidoActividad  : this.contenidoActividad
      }
      localStorage.setItem('actividad',JSON.stringify(json));
      this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);   
    }
  }  

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/editar-actividad']);
  }

  // retorna tadoas las actividades del la coleccion actividades
  async obtenerActividades() {

    await this.obtenerCategoria();
    await this.actividadService.obtenerActividades()
    .subscribe( resp => {
      this.data = resp;
      console.log(resp);
    });
  }

  // Permite acceder a la actividad para eliminar algun contenido
  editarActividad(data: any) {
    
    var json = {
        categoria    : data.categoria,
        actividad    : data.actividad,
        imagen       : data.imagen,
        nivel        : data.nivel,
        tipoActividad  : data.tipoActividad,
        contenidoActividad  : data.contenidoActividad
    }

    localStorage.setItem('actividad',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad',{editar : 'editar-actividad'}]);
  }

  // Falta arreglar
  eliminarActividad(actividad) {
    this.actividadService.removerActividad(actividad);    
  }

  // Permite cargar imagenes desde la camara o de la biblioteca
  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
  }

  // Alerta al ya existir una actividad con el mismo nombre
  async errorCreacionAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Actividad ya existente',
      mode: 'ios',
      backdropDismiss: false,
      message: 'Ya existe esta actividad, intenta con otro nombre.',
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}
