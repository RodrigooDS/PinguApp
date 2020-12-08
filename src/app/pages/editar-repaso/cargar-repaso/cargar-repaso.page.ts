import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { Repaso } from '../../../shared/repasos.interfaces';
import { RepasosService } from '../../../services/repasos.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cargar-repaso',
  templateUrl: './cargar-repaso.page.html',
  styleUrls: ['./cargar-repaso.page.scss'],
})
export class CargarRepasoPage implements OnInit {

  imageCamera: any;
  tituloEspanol: string;
  tituloIngles: string;
  imageURL: string;

  constructor(
              public router: Router, 
              private route: ActivatedRoute,
              private location: Location,
              public loadingController: LoadingController,
              public photoService: PhotoCameraService,
              public repasoService: RepasosService) { }

  ngOnInit() {
    
  }
  
  async guardarDatos(){

    let dataRepaso: Repaso;
    let contenido: {};
    dataRepaso = await JSON.parse(localStorage.getItem("repaso"))
    await this.presentLoading();
    contenido = {
      nombreEspanol    : this.tituloEspanol,
      nombreIngles     : this.tituloIngles,
      imagen           : this.imageURL,
    }
    await this.repasoService.agregarRepaso(contenido,dataRepaso);
    await this.loadingController.dismiss();
    this.location.back();   
  }

  async seleccionarImagen(){
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageURL = this.imageCamera.dataUrl
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',
      mode: 'ios'
    });
    await loading.present();
  }
}
