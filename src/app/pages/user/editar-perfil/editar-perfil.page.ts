import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
CameraPhoto, CameraSource } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  imageFile: any;
  imageCamera: any;
  uid: string;


  constructor(public photoService: PhotoCameraService,
              private auth: AuthService) { 
    this.auth.usuario.subscribe(resp => {
      this.auth.obtenerUsuario(resp.uid).pipe(
        map( (resp: User) => resp))
        .subscribe(
          resp => {this.uid = resp.uid,
                  console.log(resp.uid);
                  }
                  );
                })
    
  }

  ngOnInit() {
  }

  async addPhotoToGallery() {
    var resp : any;
    this.imageCamera = await this.photoService.addNewToGallery();
    this.imageFile = this.dataURLtoFile(this.imageCamera.dataUrl,this.uid)
    resp = await this.auth.updateImageUser(this.uid,this.imageFile);
    console.log(this.imageFile);
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
