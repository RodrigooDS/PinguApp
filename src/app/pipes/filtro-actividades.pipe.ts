import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroActividades'
})
export class FiltroActividadesPipe implements PipeTransform {

  transform(arreglo: any[], 
    texto: string = ''): any[] {

  if ( texto === '' ) {
  return arreglo;
  }

  if ( !arreglo ) {
  return arreglo;
  }

  texto = texto.toLocaleLowerCase();

  return arreglo.filter(
  item => item.nivel.toLowerCase().includes(texto)
  );
  }

}
