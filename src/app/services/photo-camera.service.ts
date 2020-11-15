import { Injectable } from '@angular/core';
import { Plugins, CameraResultType ,CameraSource} from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoCameraService {

  constructor() { }

  public async getImageFromCamera() {
    try {
      // Take a photo
      var capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Prompt, 
        quality: 100,
        allowEditing: true,
        promptLabelCancel: "Cancelar",	
        promptLabelPhoto: "Elegir de la biblioteca",	
        promptLabelPicture: "Tomar foto"
      });

      return capturedPhoto
      
    } catch (error) {
      console.log(error);
    }
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
