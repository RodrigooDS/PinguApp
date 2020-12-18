import { Component, OnInit } from '@angular/core';
import { PhotoCameraService } from '../../../services/photo-camera.service';
// import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
// CameraPhoto, CameraSource } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

// const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  imageFile: File;
  imageCamera: any;
  imageUrl: string;
  uid: string;

  constructor(public photoService: PhotoCameraService,
              private auth: AuthService) { 

    // this.auth.usuario.subscribe(resp => {
    //   this.auth.obtenerUsuarioAntiguo(resp.uid).pipe(
    //     map( (resp: User) => resp))
    //     .subscribe(
    //       resp => {
    //               this.uid = resp.uid,
    //               this.imageUrl = resp.photoURL
    //       }
    //     );
    //   })
    }

  async ngOnInit() {
    let user = await this.auth.afAuth.currentUser
    this.auth.obtenerUsuarioAntiguo(user.uid).pipe( map( (resp: User) => resp)).subscribe(resp=>
      { 
        this.uid = resp.uid,
        this.imageUrl = resp.photoURL
      });
  }
  
  async test() {
    
  }

  async addPhotoToGallery() {
    var resp : any;
    let id: any;
    this.imageCamera = await this.photoService.getImageFromCamera();
    this.imageFile = await this.photoService.dataURLtoFile(this.imageCamera.dataUrl,this.uid)
    id = await this.auth.obtenerPrecargaUsuriosPorUid(this.uid);
    resp = await this.auth.upImageToStorage(this.uid,this.imageFile);
    this.auth.updateImageUser(this.uid,resp,id);
  }

}