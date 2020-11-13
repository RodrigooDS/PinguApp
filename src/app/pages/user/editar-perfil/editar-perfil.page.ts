import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  imagen: any;

  constructor(public photoService: PhotoCameraService) { 
    
  }

  ngOnInit() {
  }

  async addPhotoToGallery() {
    this.imagen = await this.photoService.addNewToGallery();
    // console.log(this.imagen.dataUrl);
  }

}
