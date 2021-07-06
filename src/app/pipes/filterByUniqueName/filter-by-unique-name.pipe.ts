import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByUniqueName'
})
export class FilterByUniqueNamePipe implements PipeTransform {

  transform(value: any, name_search: string): any{
    
    let newValue = [];
    if(name_search == ''){
      newValue = value;
      return newValue;
    }

    for(let i=0; i < value.length; i++){
       if(value[i].Nombre == name_search){
         newValue.push(value[i]);
       }
    }

    return newValue;
    
  }

}
