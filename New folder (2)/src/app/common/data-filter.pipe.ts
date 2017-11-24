import * as _ from "lodash";
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
        if (query) {
            query = query.toUpperCase();
            // return _.filter(array, (row=>(row.machine_name.indexOf(query) > -1 || row.filename.indexOf(query) > -1 || row.filedate.indexOf(query) > -1 || row.ttime.indexOf(query) > -1)));
            return _.filter(array, (row=>(row.machine_name.toUpperCase().indexOf(query) > -1 || row.filename.toUpperCase().indexOf(query) > -1 || row.filedate.toUpperCase().indexOf(query) > -1 || row.ttime.toUpperCase().indexOf(query) > -1)));
        }
        return array;
    }

}
