import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  public estado : boolean;
  
  constructor() { }

  cambiarEstado(estado: boolean){
    this.estado = estado;
  }
}
