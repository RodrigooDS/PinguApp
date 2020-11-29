import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { TabsService } from '../../../services/tabs.service';
import { PhotoCameraService } from 'src/app/services/photo-camera.service';
import { AlertController } from '@ionic/angular';

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
  tituloActividad: string = '';
  tituloCategoria: string = '';
  nivel : string = '';
  interaccion : string = '';
  actividades: any[] = [];
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public upload: UploadService,
              public tabEstado: TabsService,
              public photoService: PhotoCameraService,
              public alertController: AlertController) {
    this.tabEstado.cambiarEstado(true);
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.imageUrl = '';
  }

  ngOnInit() {
    this.obtenerActividades();
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase())
  }

  obtenerNivel(nivel) {
    this.nivel = nivel;
  }

  obtenerInteraccion(interaccion) {
    this.interaccion = interaccion;
  }

  async guardar() {
    this.upload.obtenerActividad(this.tituloActividad,this.tituloCategoria)
    .subscribe( resp => {
      if(resp.length == 0){
        var json = {categoria    : this.tituloCategoria,
                    actividad    : this.tituloActividad,
                    imagen       : this.imageCamera.dataUrl,
                    nombreImagen : this.filename,
                    nivel        : this.nivel,
                    interaccion  : this.interaccion
        }
        localStorage.setItem('actividad',JSON.stringify(json));
        this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
      }else{
        this.errorCreacionAlerta();
      }
    });
    
  }  

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/editar-actividad']);
  }

  obtenerActividades() {
    this.upload.obtenerActividades(this.tituloCategoria)
    .subscribe( resp => {
      this.actividades = resp;
    });
  }

  editarActividad(imagen: string, actividad: string, nivel: string) {
    var json = {
      categoria    : this.tituloCategoria,
      actividad    : actividad,
      imagen       : imagen,
      nivel        : nivel
  	}
    localStorage.setItem('actividad',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-actividad/agregar-actividad']);
  }

  eliminarActividad(actividad) {
    this.upload.eliminarTodoActividad(actividad);    
  }

  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
    console.log(this.imageCamera);
  }

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
