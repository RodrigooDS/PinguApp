import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public usuario: Observable<User>;

  userToken: any;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    
    this.usuario = this.afAuth.authState;
    this.leerToken();
  }

  async login(email: string, password: string){
    try{
      const usuario  = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.usuario = this.currentUser;
      return usuario;
    }catch(error){
      console.log('Error ->', error);
    }
  }

  async register(email: string, password: string, form: any){
    console.log(form)
    try {
      const usuario  = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.obtenerToken();
      // await this.sendVerifcationEmail();
      // console.log( usuario.user.uid )
      this.registerData(form, usuario.user.uid)
      return usuario;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  
  async registerData(form: any, uid: string){
    try{
      console.log(uid)
      this.afs.collection('alumnos').doc(uid).set({
        nombreEstudiante: form.nombreEstudiante,
        apellidoEstudiante: form.apellidoEstudiante,
        nombreApoderado: form.nombreApoderado,
        apellidoApoderado: form.apellidoApoderado,
        uid: uid
      });
      
      // this.updateProfile(nombreAlumno);
      // return result;
    
    }catch(error){
      console.log(error);
    }
  }

  async logout(){
    try{
      await this.afAuth.signOut();
    }catch(error){
      console.log(error);
    }
  }

  // getCurremtUser(): boolean{
      
  //   try{
      

  //     if (this.userToken) {
  //       console.log('esta logeado')
  //       return true;
  //     } else {
  //       console.log('NO esta logeado')
  //       return false;
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  get currentUser(): Observable<firebase.User | null> {
    
    return this.usuario;
  }
 
  async obtenerToken(){
    try {
      (await this.afAuth.currentUser).getIdToken(true).then((userToken) => localStorage.setItem('tokenId', userToken) );
      this.leerToken();
    } catch (error) {
      console.log(error);
    }
  }

  leerToken(){
    if(localStorage.getItem('tokenId')){
      this.userToken = localStorage.getItem('tokenId');
      console.log('usertoken',this.userToken);
    }else{
      this.userToken = '';
      console.log('usertoken',this.userToken);
    }
  }

  estaAutenticado(): boolean{
    console.log(this.usuario);
    return this.usuario !=null
  }
  
}