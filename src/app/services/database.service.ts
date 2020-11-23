import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {


  constructor(public nativeStorage: NativeStorage) { }
  
  setItem(){
  this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  alert("Hola")
  }

  getItem(){
    this.nativeStorage.getItem('myitem')
      .then(
        data => console.log(data),
        error => console.error(error)
      );

  }
}