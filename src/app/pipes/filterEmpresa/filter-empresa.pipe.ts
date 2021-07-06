import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpresa'
})
export class FilterEmpresaPipe implements PipeTransform {

  transform(value: any, estadoActive:any): any {
    console.log(estadoActive)
    let activos = [];
    if(estadoActive == true){
      for(let i=0;i< value.length; i++){
        if(value[i].estado == "activo"){
          activos.push(value[i]);
        }
      }
    }else{
      return value;
    }

    return activos;
  }

}
