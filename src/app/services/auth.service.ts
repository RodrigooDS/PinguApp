import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
//import { Router } from "@angular/router";
//import { AngularFireAuth } from "@angular/fire/auth";
//import { Router } from "@angular/router";
//import { AngularFirestore } from "@angular/fire/firestore";
import { auth } from 'firebase/app';
import { User } from 'firebase'
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //currentUser: User;
  public user: User;
  //constructor(private AFauth : AngularFireAuth, private router : Router, private db : AngularFirestore) { }
  constructor(public afAuth: AngularFireAuth){}

  async login(email: string, password: string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    }catch(error){
      console.log(error);
    }
  }

  async register(email: string, password: string){
    try{
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return result;
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
  // login(email:string, password:string){

  //   return new Promise((resolve, rejected) =>{
  //     this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
  //       resolve(user);
  //     }).catch(err => rejected(err));
  //   });

   
  // }

  // logout(){
  //   this.AFauth.signOut().then(() => {
  //     this.router.navigate(['/login']);
  //   })
  // }

  // register(email : string, password : string, name : string){

  //   return new Promise ((resolve, reject) => {
  //     this.AFauth.createUserWithEmailAndPassword(email, password).then( res =>{
  //         // console.log(res.user.uid);
  //       const uid = res.user.uid;
  //         this.db.collection('users').doc(uid).set({
  //           name : name,
  //           uid : uid
  //         })
        
  //       resolve(res)
  //     }).catch( err => reject(err))
  //   })
    

  // }
  
  // getCurrentUser() {
  //   var user = this.AFauth.currentUser;
  //   console.log(user);
  //   return user; 
  // }

}