import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProfesores'
})
export class FiltroProfesoresPipe implements PipeTransform {

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
  item => item.nombreCompleto.toLowerCase().includes(texto)
  );
  }

}
