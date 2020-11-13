import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoCameraService {

  constructor() { }

  public async addNewToGallery() {
    try {
      // Take a photo
      var capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Camera, 
        quality: 100 
      });

      return capturedPhoto
      
    } catch (error) {
      console.log(error);
    }

  }
}
