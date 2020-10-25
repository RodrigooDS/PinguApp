import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

//firebase import
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// interfaces
import { Error } from '../shared/error.interfaces';
import { Categoria } from '../shared/categoria.interfaces';
import { User } from '../shared/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public usuario: Observable<User>;
  public error:   Observable<Error>;
  public categoria: Observable<Categoria>

  constructor(public afAuth: AngularFireAuth, 
              private afs: AngularFirestore,
              private alertController: AlertController,
              private router: Router) {
    this.usuario = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    
  }

  async login(email: string, password: string): Promise<User> {
    try{
      const {user}  = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    }catch(error){
      console.log('Error ->', error);
      this.errorMensaje(error);
    }
  }

  async register(email: string, password: string, form: any): Promise<User> {
    try {
      const {user}  = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.registerData(form, user.uid)
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error ->', error);
      this.errorMensaje(error);
    }
  }

  errorMensaje(error) {
    let tituloMensaje: string ="";
    let subMensaje:    string ="";

    const dataError: Error = {
      a: error.a,
      message: error.message,
      code: error.code
    }
    
    if(dataError.code == 'auth/user-not-found'){
      tituloMensaje = 'Correo electronico incorrecto';
      subMensaje    = 'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.';
    }
    else if(dataError.code == 'auth/email-already-in-use'){
      tituloMensaje = 'Correo electronico incorrecto';
      subMensaje    = 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.';
    }
    else{
      tituloMensaje = 'Contraseña incorrecta';
      subMensaje    = 'La contraseña no es válida o el usuario no tiene contraseña.';
    }
    this.alertaCuenta(tituloMensaje,subMensaje);
  }

  async registerData(form: any, uid: string) {
    try{
      
        this.afs.collection('alumnos').doc(uid).set({
        nombreEstudiante: form.nombreEstudiante,
        apellidoEstudiante: form.apellidoEstudiante,
        nombreApoderado: form.nombreApoderado,
        apellidoApoderado: form.apellidoApoderado,
        uid: uid
      });    
    }catch(error){
      console.log(error);
    }
  }

  async crearRepaso(categoria: string, titulo: string) {
    try{
      
      await this.afs.collection('repaso').add({
        categoria: categoria,
        titulo: titulo,
      });    
    }catch(error){
      console.log(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }


  async alertaCuenta(tituloMensaje: string, subMensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tituloMensaje,
      message: subMensaje,
      buttons: [
        {
          text: "Salir",
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}