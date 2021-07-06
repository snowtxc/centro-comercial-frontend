import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByNameDepartment'
})
export class FilterByNameDepartmentPipe implements PipeTransform {

  transform(value: any, allItems: any, name_search: string): any {
    let newValues = [];
    if (name_search == '') {
      return value;
    } else {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].name.indexOf(name_search) == 0) {
          newValues.push(allItems[i]);
        }
      }
      if (newValues.length == 0) {
        return null;
      }
 
      return newValues;
    }

  }

}
