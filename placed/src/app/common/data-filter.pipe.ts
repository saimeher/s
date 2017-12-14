import * as _ from "lodash";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, (row=>(row.firstname.indexOf(query) > -1 || row.reg_no.indexOf(query) > -1 || row.email.indexOf(query) > -1 || row.mobile.indexOf(query) > -1 || row.college.indexOf(query) > -1 || row.department.indexOf(query) > -1 || row.designation.indexOf(query) > -1)));
            // return _.filter(array, (row=>(row.firstname.indexOf(query) > -1 || row.reg_no.indexOf(query) > -1)));
        }
        return array;
    }

}
