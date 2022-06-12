import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoTel'
})
export class FormatoTelPipe implements PipeTransform {

  telefono:string="";

  transform(value: any): string {
    this.telefono = value.substring(0,3);
    this.telefono += "-";
    this.telefono += value.substring(3,6);
    this.telefono += "-";
    this.telefono += value.substring(6,8);
    this.telefono += "-";
    this.telefono += value.substring(8);
    return this.telefono;
  }

}
