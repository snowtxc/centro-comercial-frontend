import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDepartamentoLocalidad'
})
export class FilterByDepartamentoLocalidadPipe implements PipeTransform {

  transform(value: any, departamentoId:any, localidadId:any): any {
  
      let newValue = [];
      if(departamentoId == ''){      //  ''  cuando esta vacio signifiaca que incluye a todos
        newValue = value;
      }else{
        if(localidadId == ''){
          for (let i = 0; i < value.length; i++) {
            if(value[i].Localidad.Departamento.id == departamentoId){
              newValue.push(value[i]);
            }
          }
        }else{
          for(let i=0; i< value.length; i++){
            if(value[i].LocalidadId == localidadId){
              newValue.push(value[i]);
            }
          }
        }
      }


      return newValue;
  }

}
