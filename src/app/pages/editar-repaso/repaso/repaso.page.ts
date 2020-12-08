import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//service

import { TabsService } from '../../../services/tabs.service';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { AlertController } from '@ionic/angular';
import { RepasosService } from '../../../services/repasos.service';

@Component({
  selector: 'app-repaso',
  templateUrl: './repaso.page.html',
  styleUrls: ['./repaso.page.scss'],
})
export class RepasoPage implements OnInit {

  imageFile: File;
  imageCamera: any;
  imageUrl: string;

  filename: string;
  tituloActividad: string = '';
  tituloCategoria: string = '';
  nivel : string = '';

  repasos: any[] = [];

  imageURL: string;
  
  constructor(public router: Router, 
              private route: ActivatedRoute,
              public tabEstado: TabsService,
              public photoService: PhotoCameraService,
              public repasoService: RepasosService,
              public alertController: AlertController) {
    this.tabEstado.cambiarEstado(true);
    this.tituloCategoria = this.route.snapshot.paramMap.get('category');
    this.imageURL = '';
  }

  ngOnInit() {
    this.obtenerRepasos();
    this.imageURL = '';
  }

  ionViewWillEnter() {
    this.tituloActividad = ''
    this.imageURL = '';
  }

  obtenerTituloActividad($event) {
    this.tituloActividad = $event.target.value;
    this.tituloActividad.replace(/\b\w/g, l => l.toUpperCase())
  }

  obtenerNivel(nivel) {
    this.nivel = nivel;
  }

  async guardar() {
    let existenciaRepaso : boolean;
    // existenciaRepaso = await this.upload.obtenerExistenciaDeRepaso(this.tituloActividad,this.tituloCategoria)
    // if(existenciaRepaso){
    //   this.errorCreacionAlerta();
    // }else{
      var json = {categoria    : this.tituloCategoria,
                  actividad    : this.tituloActividad,
                  imagen       : this.imageURL,
                  nombreImagen : this.filename,
                  nivel        : this.nivel
      }
      localStorage.setItem('repaso',JSON.stringify(json));
      this.router.navigate(['/tablinks/editar-repaso/agregar-repaso']);
      // }   
  }  

  cancelar() {
    this.tabEstado.cambiarEstado(false);
    this.router.navigate(['/tablinks/editar-repaso']);
  }

  obtenerRepasos() {
    this.repasoService.obtenerRepasos().subscribe(resp => this.repasos = resp);
  }

  editarActividad(data: any) {
    
    var json = {
      categoria    : data.categoria,
      actividad    : data.actividad,
      imagen       : data.imagen
  	}
    localStorage.setItem('repaso',JSON.stringify(json));
    this.router.navigate(['/tablinks/editar-repaso/agregar-repaso',{editar : 'editar-actividad'}]);
  }

  eliminarActividad(repaso) {
    this.repasoService.removerActividad(repaso);     
  }

  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl;
  }

  async errorCreacionAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Repaso ya existente',
      mode: 'ios',
      backdropDismiss: false,
      message: 'Ya existe este repaso, intenta con otro nombre.',
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}

  

