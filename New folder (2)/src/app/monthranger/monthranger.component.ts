import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ExportService } from '../common/export.service';

@Component({
  selector: 'app-monthranger',
  templateUrl: './monthranger.component.html',
  styleUrls: ['./monthranger.component.css']
})
export class MonthrangerComponent implements OnInit {


  master_role;
  utype;
  d = new Date();
  adate;
  collegdepts:any = [];
  attendance = [];
  fdate;
  tdate;
  role;
  count;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  public model: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };
  public model1: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };


  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    private _exportService: ExportService,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this._apiService.page = 'monthranger';
    this.fdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    this.tdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    console.log(this.fdate, this.tdate);


    // console.log(this.fdate,this.tdate,'from-to'); 


  }

  fdatemodel;
  tdatemodel;
  onDateChanged1(event: IMyDateModel) {
    this.fdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
    this.fdatemodel = { date: { year: event.date.year, month: ('0' + event.date.month).slice(-2), day: ('0' + event.date.day).slice(-2) } };
    console.log(this.fdate, this.fdatemodel, 'from');
  }

  onDateChanged(event: IMyDateModel) {
    this.tdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
    this.tdatemodel = { date: { year: event.date.year, month: ('0' + event.date.month).slice(-2), day: ('0' + event.date.day).slice(-2) } };
    console.log(this.tdate, this.tdatemodel, 'to');
    this.gettablecalender();
  }
  
  // newdates = [{
  //   date: '',
  //   intime: '',
  //   outime: '',
  //   worktime: '',
  // }]
  newdates = [];
  startdate;
  loading: boolean = false;
  loading1: boolean = false;

  enddate;
  gettablecalender() {
    this.loading = true;
    this.loading1 = true;
    console.log(this.fdatemodel, this.tdatemodel, 'from-to date');

    this.startdate = new Date(this.fdate);
    this.enddate = new Date(this.tdate);


    while (this.startdate <= this.enddate) {

      this.newdates.push(this.startdate.getFullYear() + '-' + ('0' + this.startdate.getMonth()).slice(-2) + '-' + ('0' + this.startdate.getDate()).slice(-2))

      this.startdate.setDate(this.startdate.getDate() + 1);

    }
    this.count = this.newdates.length;
    console.log(this.newdates, this.newdates.length, 'array dates');
    const body = {
      'fdate': this.fdate,
      'tdate': this.tdate
    }

    this._apiService.getAttendancebydays(body).subscribe(data => {
      if (data.data.success) {
        this.collegdepts = data.data.colgdepts;
        this.attendance = data.data.attendance;
        this.loading = false;
        this.loading1 = false;
        console.log(this.attendance, this.collegdepts, 'college & departments');
      }
    });
  }

  // refresh(): void {
  //   window.location.reload();
  // }

  // Export
  collegename;
  deptname;
  export(type,data,value1) {
    console.log(type,data,value1,'export');
    this.collegename = value1[0].college;
    this.deptname = value1[0].department;
    console.log(this.collegename,this.deptname,'filenames')
    
    // create data to export with custom headers and s.no
    const exportData: Array<any> = [];

    if (this.collegdepts && this.attendance) {
      console.log('attendance is ', value1)
      value1.forEach(row => {
        exportData.push({
          'College': row.college,
          'Department': row.department,
          'Employee id': row.reg_no,
          'Employee_name': row.name,
          'Contact No': row.mobile,
          'Day1': row.day_1,
          'In_Time1': row.in_time_1,
          'Out_Time1': row.out_time_1,
          'Duration1': row.work_tm_1,
          'Day2': row.day_2,
          'In_Time2': row.in_time_2,
          'Out_Time2': row.out_time_2,
          'Duration2': row.work_tm_2,
          'Day3': row.day_3,
          'In_Time3': row.in_time_3,
          'Out_Time3': row.out_time_3,
          'Duration3': row.work_tm_3,
          'Day4': row.day_4,
          'In_Time4': row.in_time_4,
          'Out_Time4': row.out_time_4,
          'Duration4': row.work_tm_4,
          'Day5': row.day_5,
          'In_Time5': row.in_time_5,
          'Out_Time5': row.out_time_5,
          'Duration5': row.work_tm_5,
          'Day6': row.day_6,
          'In_Time6': row.in_time_6,
          'Out_Time6': row.out_time_6,
          'Duration6': row.work_tm_6,
          'Day7': row.day_7,
          'In_Time7': row.in_time_7,
          'Out_Time7': row.out_time_7,
          'Duratio7': row.work_tm_7,
          'Day8': row.day_8,
          'In_Time8': row.in_time_8,
          'Out_Time8': row.out_time_8,
          'Duration8': row.work_tm_8,
          'Day9': row.day_9,
          'In_Time9': row.in_time_9,
          'Out_Time9': row.out_time_9,
          'Duratio9': row.work_tm_9,
          'Day10': row.day_10,
          'In_Time10': row.in_time_10,
          'Out_Time10': row.out_time_10,
          'Duratio10': row.work_tm_10,
          'Day11': row.day_11,
          'In_Time11': row.in_time_11,
          'Out_Time11': row.out_time_11,
          'Duratio11': row.work_tm_11,
          'Day12': row.day_12,
          'In_Time12': row.in_time_12,
          'Out_Time12': row.out_time_12,
          'Duratio12': row.work_tm_12,
          'Day13': row.day_1,
          'In_Time13': row.in_time_13,
          'Out_Time13': row.out_time_13,
          'Duratio13': row.work_tm_13,
          'Day14': row.day_14,
          'In_Time14': row.in_time_14,
          'Out_Time14': row.out_time_14,
          'Duratio14': row.work_tm_14,
          'Day15': row.day_15,
          'In_Time15': row.in_time_15,
          'Out_Time15': row.out_time_15,
          'Duration15': row.work_tm_15,
          'Day16': row.day_16,
          'In_Time16': row.in_time_16,
          'Out_Time16': row.out_time_16,
          'Duration16': row.work_tm_16,
          'Day17': row.day_17,
          'In_Time17': row.in_time_17,
          'Out_Time17': row.out_time_17,
          'Duration17': row.work_tm_17,
          'Day18': row.day_18,
          'In_Time18': row.in_time_18,
          'Out_Time18': row.out_time_18,
          'Duration18': row.work_tm_18,
          'Day19': row.day_19,
          'In_Time19': row.in_time_19,
          'Out_Time19': row.out_time_19,
          'Duration19': row.work_tm_19,
          'Day20': row.day_20,
          'In_Time20': row.in_time_20,
          'Out_Time20': row.out_time_20,
          'Duration20': row.work_tm_20,
          'Day21': row.day_21,
          'In_Time21': row.in_time_21,
          'Out_Time21': row.out_time_21,
          'Duration21': row.work_tm_21,
          'Day22': row.day_22,
          'In_Time22': row.in_time_22,
          'Out_Time22': row.out_time_22,
          'Duration22': row.work_tm_22,
          'Day23': row.day_23,
          'In_Time23': row.in_time_23,
          'Out_Time23': row.out_time_23,
          'Duration23': row.work_tm_23,
          'Day24': row.day_24,
          'In_Time24': row.in_time_24,
          'Out_Time24': row.out_time_24,
          'Duration24': row.work_tm_24,
          'Day25': row.day_25,
          'In_Time25': row.in_time_25,
          'Out_Time25': row.out_time_25,
          'Duration25': row.work_tm_25,
          'Day26': row.day_26,
          'In_Time26': row.in_time_26,
          'Out_Time26': row.out_time_26,
          'Duration26': row.work_tm_26,
          'Day27': row.day_27,
          'In_Time27': row.in_time_27,
          'Out_Time27': row.out_time_27,
          'Duration27': row.work_tm_27,
          'Day28': row.day_28,
          'In_Time28': row.in_time_28,
          'Out_Time28': row.out_time_28,
          'Duration28': row.work_tm_28,
          'Day29': row.day_29,
          'In_Time29': row.in_time_29,
          'Out_Time29': row.out_time_29,
          'Duration29': row.work_tm_29,
          'Day30': row.day_30,
          'In_Time30': row.in_time_30,
          'Out_Time30': row.out_time_30,
          'Duration30': row.work_tm_30,
          'Day31': row.day_31,
          'In_Time31': row.in_time_31,
          'Out_Time31': row.out_time_31,
          'Duration31': row.work_tm_31,
        });
      });

      const data = 'test';
      const columns = [
        { title: 'college', dataKey: 'college' },
        { title: 'department', dataKey: 'department' },
        { title: 'employee_id', dataKey: 'reg_no' },
        { title: 'Employee Name', dataKey: 'employee_name' },
        { title: 'Contact No', dataKey: 'mobile' },
        { title: 'Day1', dataKey: 'day_1' },
        { title: 'In Time1', dataKey: 'in_time_1' },
        { title: 'Out Time1', dataKey: 'out_time_1' },
        { title: 'Duration1', dataKey: 'work_tm_1' },
        { title: 'Day2', dataKey: 'day_2' },
        { title: 'In Time2', dataKey: 'in_time_2' },
        { title: 'Out Time2', dataKey: 'out_time_2' },
        { title: 'Duration2', dataKey: 'work_tm_2' },
        { title: 'Day3', dataKey: 'day_3' },
        { title: 'In Time3', dataKey: 'in_time_3' },
        { title: 'Out Time3', dataKey: 'out_time_3' },
        { title: 'Duration3', dataKey: 'work_tm_3' },
        { title: 'Day4', dataKey: 'day_4' },
        { title: 'In Time4', dataKey: 'in_time_4' },
        { title: 'Out Time4', dataKey: 'out_time_4' },
        { title: 'Duration4', dataKey: 'work_tm_4' },
        { title: 'Day5', dataKey: 'day_5' },
        { title: 'In Time5', dataKey: 'in_time_5' },
        { title: 'Out Time5', dataKey: 'out_time_5' },
        { title: 'Duration5', dataKey: 'work_tm_5' },
        { title: 'Day6', dataKey: 'day_6' },
        { title: 'In Time6', dataKey: 'in_time_6' },
        { title: 'Out Time6', dataKey: 'out_time_6' },
        { title: 'Duration6', dataKey: 'work_tm_6' },
        { title: 'Day7', dataKey: 'day_7' },
        { title: 'In Time7', dataKey: 'in_time_7' },
        { title: 'Out Time7', dataKey: 'out_time_7' },
        { title: 'Duration7', dataKey: 'work_tm_7' },
        { title: 'Day8', dataKey: 'day_8' },
        { title: 'In Time8', dataKey: 'in_time_8' },
        { title: 'Out Time8', dataKey: 'out_time_8' },
        { title: 'Duration8', dataKey: 'work_tm_8' },
        { title: 'Day9', dataKey: 'day_9' },
        { title: 'In Time9', dataKey: 'in_time_9' },
        { title: 'Out Time9', dataKey: 'out_time_9' },
        { title: 'Duration9', dataKey: 'work_tm_9' },
        { title: 'Day10', dataKey: 'day_10' },
        { title: 'In Time10', dataKey: 'in_time_10' },
        { title: 'Out Time10', dataKey: 'out_time_10' },
        { title: 'Duration10', dataKey: 'work_tm_10' },
        { title: 'Day11', dataKey: 'day_11' },
        { title: 'In Time11', dataKey: 'in_time_11' },
        { title: 'Out Time11', dataKey: 'out_time_11' },
        { title: 'Duration11', dataKey: 'work_tm_11' },
        { title: 'Day12', dataKey: 'day_12' },
        { title: 'In Time12', dataKey: 'in_time_12' },
        { title: 'Out Time12', dataKey: 'out_time_12' },
        { title: 'Duration12', dataKey: 'work_tm_12' },
        { title: 'Day13', dataKey: 'day_13' },
        { title: 'In Time13', dataKey: 'in_time_13' },
        { title: 'Out Time13', dataKey: 'out_time_13' },
        { title: 'Duration13', dataKey: 'work_tm_13' },
        { title: 'Day14', dataKey: 'day_14' },
        { title: 'In Time14', dataKey: 'in_time_14' },
        { title: 'Out Time14', dataKey: 'out_time_14' },
        { title: 'Duration14', dataKey: 'work_tm_14' },
        { title: 'Day15', dataKey: 'day_15' },
        { title: 'In Time15', dataKey: 'in_time_15' },
        { title: 'Out Time15', dataKey: 'out_time_15' },
        { title: 'Duration15', dataKey: 'work_tm_15' },
        { title: 'Day16', dataKey: 'day_16' },
        { title: 'In Time16', dataKey: 'in_time_16' },
        { title: 'Out Time16', dataKey: 'out_time_16' },
        { title: 'Duration16', dataKey: 'work_tm_16' },
        { title: 'Day17', dataKey: 'day_17' },
        { title: 'In Time17', dataKey: 'in_time_17' },
        { title: 'Out Time17', dataKey: 'out_time_17' },
        { title: 'Duration17', dataKey: 'work_tm_17' },
        { title: 'Day18', dataKey: 'day_18' },
        { title: 'In Time18', dataKey: 'in_time_18' },
        { title: 'Out Time18', dataKey: 'out_time_18' },
        { title: 'Duration18', dataKey: 'work_tm_18' },
        { title: 'Day19', dataKey: 'day_19' },
        { title: 'In Time19', dataKey: 'in_time_19' },
        { title: 'Out Time19', dataKey: 'out_time_19' },
        { title: 'Duration19', dataKey: 'work_tm_19' },
        { title: 'Day20', dataKey: 'day_20' },
        { title: 'In Time20', dataKey: 'in_time_20' },
        { title: 'Out Time20', dataKey: 'out_time_20' },
        { title: 'Duration20', dataKey: 'work_tm_20' },
        { title: 'Day21', dataKey: 'day_21' },
        { title: 'In Time21', dataKey: 'in_time_21' },
        { title: 'Out Time21', dataKey: 'out_time_21' },
        { title: 'Duration21', dataKey: 'work_tm_21' },
        { title: 'Day22', dataKey: 'day_22' },
        { title: 'In Time22', dataKey: 'in_time_22' },
        { title: 'Out Time22', dataKey: 'out_time_22' },
        { title: 'Duration22', dataKey: 'work_tm_22' },
        { title: 'Day23', dataKey: 'day_23' },
        { title: 'In Time23', dataKey: 'in_time_23' },
        { title: 'Out Time23', dataKey: 'out_time_23' },
        { title: 'Duration23', dataKey: 'work_tm_23' },
        { title: 'Day24', dataKey: 'day_24' },
        { title: 'In Time24', dataKey: 'in_time_24' },
        { title: 'Out Time24', dataKey: 'out_time_24' },
        { title: 'Duration24', dataKey: 'work_tm_24' },
        { title: 'Day25', dataKey: 'day_25' },
        { title: 'In Time25', dataKey: 'in_time_25' },
        { title: 'Out Time25', dataKey: 'out_time_25' },
        { title: 'Duration25', dataKey: 'work_tm_25' },
        { title: 'Day26', dataKey: 'day_26' },
        { title: 'In Time26', dataKey: 'in_time_26' },
        { title: 'Out Time26', dataKey: 'out_time_26' },
        { title: 'Duration26', dataKey: 'work_tm_26' },
        { title: 'Day27', dataKey: 'day_27' },
        { title: 'In Time27', dataKey: 'in_time_27' },
        { title: 'Out Time27', dataKey: 'out_time_27' },
        { title: 'Duration27', dataKey: 'work_tm_27' },
        { title: 'Day28', dataKey: 'day_28' },
        { title: 'In Time28', dataKey: 'in_time_28' },
        { title: 'Out Time28', dataKey: 'out_time_28' },
        { title: 'Duration28', dataKey: 'work_tm_28' },
        { title: 'Day29', dataKey: 'day_29' },
        { title: 'In Time29', dataKey: 'in_time_29' },
        { title: 'Out Time29', dataKey: 'out_time_29' },
        { title: 'Duration29', dataKey: 'work_tm_29' },
        { title: 'Day30', dataKey: 'day_30' },
        { title: 'In Time30', dataKey: 'in_time_30' },
        { title: 'Out Time30', dataKey: 'out_time_30' },
        { title: 'Duration30', dataKey: 'work_tm_30' },
        { title: 'Day31', dataKey: 'day_31' },
        { title: 'In Time31', dataKey: 'in_time_31' },
        { title: 'Out Time31', dataKey: 'out_time_31' },
        { title: 'Duration31', dataKey: 'work_tm_31' },
      ];

      switch (type) {
        case 'csv':
          console.log(this.collegename,this.deptname)
          this._exportService.exportToCsv(this.collegename+'-'+this.deptname , exportData);
          break;

      }
    }
  }


}
