import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from 'firebase'
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //currentUser: User;
  public user: User;

  //constructor(private AFauth : AngularFireAuth, private router : Router, private db : AngularFirestore) { }
  constructor(private afAuth: AngularFireAuth,private router: Router,private db : AngularFirestore) { }

  async login(email: string, password: string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log(password);
      return result;
    }catch(error){
      console.log(error);
    }
  }

  // login(email:string, password:string){
  //   return new Promise((resolve, rejected) =>{
  //     this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
  //       resolve(user);
  //     }).catch(err => rejected(err));
  //   });
  // }

  async register(email: string, password: string){
    try{
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return result;
    }catch(error){
      console.log(error);
    }
  }

  // register(email : string, password : string, name : string){

  //   return new Promise ((resolve, reject) => {
  //     this.afAuth.createUserWithEmailAndPassword(email, password).then( res =>{
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

  async logout(){
    try{
      await this.afAuth.signOut();
    }catch(error){
      console.log(error);
    }
  }

  // logout(){
  //   this.afAuth.signOut().then(() => {
  //     this.router.navigate(['/login']);
  //   })
  // }

  getCurremtUser(){
    try{
      return this.afAuth.currentUser;
    }catch(error){
      console.log(error);
    }
  }

  async updateProfile(userName: string){
    
    try {
      
      (await this.afAuth.currentUser).updateProfile({
        displayName: userName
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  

}