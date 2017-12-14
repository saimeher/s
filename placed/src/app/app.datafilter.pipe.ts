import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DatatablesPipe implements PipeTransform {

keys = [];
    transform(array: any[], query: string): any {
      
   if (array != null && array.length > 0) {
  let ans = [];

  if (this.keys.length == 0) {
    this.keys = Object.keys(array[0]);
  }

  for (let i of array) {
    for (let k of this.keys) {
      
    if(i[k]!=null){
       if (i[k].toLowerCase().match('^.*' + query +'.*$')) {
        ans.push(i);
        break;
      }
       else if (i[k].toUpperCase().match('^.*' + query +'.*$')) {
        ans.push(i);
        break;
      }
    }
    }
  }
  return ans;
    }
}
  

}

// transform(value: any, args?: any): any {
//     return null;
//   }