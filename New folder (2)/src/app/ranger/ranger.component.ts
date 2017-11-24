import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ExportService } from '../common/export.service';
import * as JSPdf from 'jspdf';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



declare let jsPDF;
declare var $;


@Component({
  selector: 'app-ranger',
  templateUrl: './ranger.component.html',
  styleUrls: ['./ranger.component.css']
})
export class RangerComponent implements OnInit {
  days_form: FormGroup;
  master_role;
  utype;
  d = new Date();
  adate;
  collegdepts: any = [];
  attendance = [];
  idsdata = [];
  fdate;
  tdate;
  role;
  count;
  selectedItems = [];
  mondata = [];
  dropdownList = [];
  dropdownSettings = {};
  typesss = 'ALL';
  items = [];
  reg_no;
  data;
  select = 'all';
  id;
  display = false;
  show = false;
  mondata1 = [];
  collegdepts1 = [];
  idsdata1 = [];
  count1 = 0;
  view = false;
  data1;
  data2;
  data3;
  count2 = 0;
  work;
  worked1 = 0;
  show1 = false;
  worked;
  miss;
  sum;
  hr;
  avg4;
  dtaa;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "";
  public sortOrder = "asc";

  newdates = [];
  startdate;
  loading: boolean = false;
  loading1: boolean = false;

  // public myDatePickerOptions: IMyDpOptions = {
   
  //   dateFormat: 'dd.mm.yyyy',
  // };


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,

  };

  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mmm-yyyy',
    editableDateField: false,
    disableWeekends: false,

    //  disableDays: this.service.holidays,
    disableUntil: { year: 0, month: 0, day: 0 }
    // disableUntil: {year: , month: 5 , day: 17}

  };

  public model: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };
  public model1: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };

  @ViewChild('test') el: ElementRef;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    private _exportService: ExportService,
    public vcr: ViewContainerRef,
    public fb: FormBuilder,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {


    this.days_form = this.fb.group({
      fdate: ['', Validators.required],
      tdate: ['', Validators.required],
      selectid: ['', Validators.required],
      // selectchart:['',Validators.required]

    });
    this._apiService.page = 'ranger';
    this.fdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    this.tdate = this.d.getFullYear() + '-' + ('0' + (this.d.getMonth() + 1)).slice(-2) + '-' + this.d.getDate();
    console.log(this.fdate, this.tdate);
    this.utype = localStorage.getItem('utype');
    this.master_role = localStorage.getItem('master_role');
    const vals = {
      utype: 'adm',

    }
    this._apiService.getStaffData(vals).subscribe(dataa => {
      // console.log(dataa);
      for (var i = 0; i < dataa.data.data.length; i++) {
        this.dropdownList[i] = new Object();
        this.dropdownList[i]["id"] = dataa.data.data[i].reg_no;
        this.dropdownList[i]["itemName"] = dataa.data.data[i].reg_no + ' - ' + dataa.data.data[i].name;
        this.dropdownList[i]["name1"] = dataa.data.data[i].name;

        this.items[i] = new Object();
        this.items[i].name = dataa.data.data[i].name;
        this.items[i].reg_no = dataa.data.data[i].reg_no;

      }
      this.dropdownList.unshift({ 'id': 'ALL', 'itemName': 'ALL', 'name1': 'ALL' })
    });
    this.getRole();
    this.dropdownSettings = {

      // singleSelection: true,
      // text: "Select ",
      // enableSearchFilter: true,
      // classes: "myclass custom-class",
      singleSelection: true,
      text: "ALL",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    // console.log(this.fdate,this.tdate,'from-to'); 
  }

  fdatemodel;
  tdatemodel;
  // onDateChanged1(event: IMyDateModel) {
  //   this.fdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
  //   this.fdatemodel = { date: { year: event.date.year, month: ('0' + event.date.month).slice(-2), day: ('0' + event.date.day).slice(-2) } };
  //   console.log(this.fdate, this.fdatemodel, 'from');
  // }


  onDateChanged1(event: IMyDateModel) {
    
        this.fdate = event.date.year + '-' + event.date.month + '-' + event.date.day;
        this.myDatePickerOptions2.disableUntil.year = event.date.year
        this.myDatePickerOptions2.disableUntil.month = event.date.month
        this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
      }
      onDateChanged(event: IMyDateModel) {
        
         // this.to_date = event.formatted
         this.tdate = event.date.year + '-' + event.date.month + '-' + event.date.day;
         console.log(this.tdate, 'from date test');
       }
  // onDateChanged(event: IMyDateModel) {
  //   this.tdate = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
  //   this.tdatemodel = { date: { year: event.date.year, month: ('0' + event.date.month).slice(-2), day: ('0' + event.date.day).slice(-2) } };
  //   console.log(this.tdate, this.tdatemodel, 'to');
  //   // this.gettablecalender();
  // }
  enddate;
  count3 = 0;
  gettablecalender() {
    this.loading = true;
    this.loading1 = true;

    console.log(this.fdatemodel, this.tdatemodel, 'from-to date');
    console.log(this.model,this.model1,'hfskrjdtgjkhjk');
    this.startdate = new Date(this.fdate);
    this.enddate = new Date(this.tdate);


    while (this.startdate <= this.enddate) {

      this.newdates.push(this.startdate.getFullYear() + '-' + ('0' + this.startdate.getMonth()).slice(-2) + '-' + ('0' + this.startdate.getDate()).slice(-2))

      this.startdate.setDate(this.startdate.getDate() + 1);

    }
    this.count = this.newdates.length;
    console.log(this.count);
    console.log(this.newdates, this.newdates.length, 'array dates');
    console.log(this.select);
    const body = {
      'fdate': this.fdate,
      'tdate': this.tdate
    }
    console.log(this.id);
    if (this.id == undefined || this.id == 'ALL') {
      this._apiService.gettestAttendancebydays(body).subscribe(data => {
        if (data.data.success) {
          this.collegdepts = data.data.colgdepts;
          this.mondata = data.data.mondata;
          this.idsdata = data.data.staffids;
          this.loading = false;
          this.loading1 = false;
          this.show = true;
          this.getcountforlate(body);
          console.log(this.mondata, this.collegdepts, this.idsdata, 'college & departments');
        }
      });
    }
    else {
      console.log('else');
      this._apiService.getattendancebysingle(body, this.id).subscribe(data => {
        this.data = data.data.data1;
        this.work = data.data.work[0].count;
        this.worked = data.data.worked.length;
        this.miss = 0;
        this.worked1 = 0;
        this.count3 = 0;
        this.sum = 0;
        this._apiService.getleave(body, this.id).subscribe(dtaa => {
          this.dtaa = dtaa;
        })
        for (var i = 0; i < data.data.worked.length; i++) {
          console.log(data.data.worked[i].ct);
          if (data.data.worked[i].ct == 1) {
            this.count3 += 1;
          }
          if (data.data.worked[i].ct == 2) {
            this.worked1 += 1;
          }
          console.log(this.count3);
        }
        for (i = 0; i < data.data.average.length; i++) {
          if (data.data.average[i].seconds == null) {
            console.log('hi');
          }
          if (data.data.average[i].seconds != null) {
            this.sum += parseInt(data.data.average[i].seconds);
          }

        }

        var hours = (this.sum / 3600);
        var average = hours / this.worked1;

        var avg = average.toString().split('.');

        this.hr = avg[0];

        var avg1 = '0.' + avg[1];
        var avg2 = parseFloat(avg1) * 60;
        var avg3 = avg2.toString().split('.');

        this.avg4 = avg3[0];
        // var minutes = Math.floor((this.sum - (hours * 3600)) / 60);

        this.miss = this.work - (this.count3 + this.worked1);
        this.show = false;
        this.view = false;
        this.collegdepts = false;
        this.show1 = true;
        this.display = true;

        console.log(this.data);

      });
    }
  }

  getRole() {
    this._apiService.getRole().subscribe(data => {
      if (data.data.success) {
        this.role = data.data.role;
        // console.log(this.role);
      }
    });
  }

  // Export
  collegename;
  deptname;
  clg_fullname;
  dept_fullname;
  clg_id;
  value2 = [];
  value3 = [];
  newresult = [];
  value4 = [];
  value5 = [];
  export(type, data, value1) {
    console.log(type, data, value1, 'export');

    this.collegename = data[0].college;
    this.deptname = data[0].department;
    this.clg_fullname = data[0].college_name;
    this.dept_fullname = data[0].department_name;
    console.log(this.collegename, this.deptname, 'filenames');

    this.clg_id = data[0].id;
    console.log(this.clg_id, 'clgid');


    this.value2 = this.mondata[this.clg_id];
    this.attendance = this.idsdata[this.clg_id];

    console.log(this.value2, this.attendance, 'actual result');

    for (var i = 0; i <= this.attendance.length; i++) {
      this.value3 = this.value2[this.attendance[i]];
      this.newresult.push(this.value3);
      //console.log(this.attendance.length,this.value2[this.attendance[0]],'data');
    }
    // this.value3 = this.value2[this.attendance[0]];
    console.log(this.newresult.length, this.newresult, 'data');

    for (var j = 0; j < this.newresult.length; j++) {
      if (this.newresult[j]) {
        for (var k = 0; k < this.newresult[j].length; k++) {
          this.value4 = this.newresult[j][k];
          if (this.newresult[j][k]) {
            this.value5.push(this.value4);
          }
        }

      }
      // console.log(this.value5,'single array');
    }
    console.log(this.value5, 'single array');

    // create data to export with custom headers and s.no
    const exportData: Array<any> = [];

    if (this.collegdepts && this.mondata) {
      console.log('attendance is ', this.newresult)
      this.value5.forEach(row => {
        exportData.push({
          'College': this.clg_fullname,
          'Department': this.dept_fullname,
          'Employee id': row.reg_no,
          'Employee_name': row.name,
          'Date': row.date,
          'Weekday': row.weekday,
          'Morning': row.morning,
          'Evening': row.evening,
          'From - Todate': this.fdate + '--' + this.tdate,
        });
      });

      const data = 'test';
      const columns = [
        { title: 'college', dataKey: 'college' },
        { title: 'department', dataKey: 'department' },
        { title: 'employee_id', dataKey: 'reg_no' },
        { title: 'Employee Name', dataKey: 'name' },
        // { title: 'Contact No', dataKey: 'mobile' },
        { title: 'Date', dataKey: 'date' },
        { title: 'WeekDay', dataKey: 'weekday' },
        { title: 'Morning', dataKey: 'morning' },
        { title: 'Evening', dataKey: 'evening' },
      ];

      switch (type) {
        case 'csv':
          console.log(this.collegename, this.deptname)
          this._exportService.exportToCsv(this.collegename + '-' + this.deptname, exportData);
          break;

      }
    }
  }
  public download() {
    var doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.save('Test.pdf');
  }

  public pdfHtml(): void {
    const pdf = new jsPDF('p', 'pt', 'a4');
    console.log(this.el);
    let options = {
      pagesplit: true
    };
    pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
      pdf.save("test.pdf");
    });

  }
  print() {
    window.print();
  }

  onItemSelect(item: any) {
    console.log(item);
    this.id = item.id;
    console.log(item);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  Types(a) {
    this.reg_no = a.reg_no;
    this.typesss = a.name;
    console.log(this.reg_no);
    // this._apiService.getattendancebysingle(this.reg_no).subscribe(data=>
    // {
    //   this.data =data;
    // })
  }
  getcountforlate(body) {
    this._apiService.getcountforlate(body).subscribe(data => {
      this.collegdepts1 = data.data.colgdepts;
      this.mondata1 = data.data.mondata;
      this.data3 = data.data.data2;
      this.data1 = data.data.data1;

      if (data.data.data1) {
        this.count1 = data.data.data1.length;
      }
      if (data.data.data2) {
        this.count2 = data.data.data2.length;
      }
      console.log(this.count1);
      console.log(this.data1);
      // this.count1 =data.data.mondata.count;
      this.idsdata1 = data.data.staffids;
    })
  }
  view1() {
    const body1 = {
      'fdate': this.fdate,
      'tdate': this.tdate
    }
    this._apiService.getcountforlate(body1).subscribe(data => {
      this.collegdepts1 = data.data.colgdepts;
      this.mondata1 = data.data.mondata;
      this.data1 = data.data.data1;
      this.data3 = data.data.data2;
      this.data2 = this.data1;
      console.log(this.mondata1);
      this.collegdepts = false;
      this.view = true;
    });
  }

  view2() {
    const body1 = {
      'fdate': this.fdate,
      'tdate': this.tdate
    }
    this._apiService.getcountforlate(body1).subscribe(data => {
      this.collegdepts1 = data.data.colgdepts;
      this.mondata1 = data.data.mondata;
      this.data1 = data.data.data1;
      this.data3 = data.data.data2;
      this.data2 = this.data3;
      console.log(this.mondata1);
      this.collegdepts = false;
      this.view = true;
    });
  }
}
