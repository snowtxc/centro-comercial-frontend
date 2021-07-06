import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByRubro'
})
export class FilterByRubroPipe implements PipeTransform {

  transform(value: any,rubro:any): any{
    let newValue = [];
    if(rubro == ''){  //todos
      newValue = value;
    }else{
      for(let i=0; i < value.length; i++){
        if (value[i].rubro == rubro || value[i].rubro_secundario == rubro){
          newValue.push(value[i]);
        }
      }
    }

    return newValue;
  } 

}
