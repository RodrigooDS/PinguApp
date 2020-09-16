import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public usuario: Observable<User>;


  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.usuario = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async login(email: string, password: string): Promise<User>{
    try{
      const {user}  = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    }catch(error){
      console.log('Error ->', error);
    }
  }

  async register(email: string, password: string, form: any): Promise<User> {
    
    try {
      const {user}  = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.registerData(form, user.uid)
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  
  async registerData(form: any, uid: string){
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

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
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
  
}