import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  
  // public user$: Observable<Usuario>;
  public user: User;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap((user) => {
    //     if (user) {
    //       return this.afs.doc<Usuario>(`users/${user.uid}`).valueChanges();
    //     }
    //     return of(null);
    //   })
    // );
  }

  async login(email: string, password: string){
    try{
      const user  = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    }catch(error){
      console.log('Error ->', error);
    }
  }

  async register(email: string, password: string, form: any){
    console.log(form)
    try {
      const usuario  = await this.afAuth.createUserWithEmailAndPassword(email, password);
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

  getCurremtUser(){
    try{
      return this.afAuth.currentUser;
    }catch(error){
      console.log(error);
    }
  }

  // private updateUserData(usuario: Usuario) {

  //   const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${usuario.uid}`);

  //   const data: Usuario = {
  //     uid: usuario.uid,
  //     email: usuario.email,
  //     // emailVerified: usuario.emailVerified,
  //     displayName: usuario.displayName,
  //   };

  //   return userRef.set(data, { merge: true });
  // }

  // async updateProfile(userName: string){
    
  //   try {
      
  //     (await this.afAuth.currentUser).updateProfile({
  //       displayName: userName
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  // }

  

}