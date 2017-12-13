import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef, ViewContainerRef, Input, AUTO_STYLE } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from "@angular/forms";
import { ModalModule } from "ngx-modal";
import { CustomValidators } from 'ng2-validation';
import * as Highcharts from 'highcharts';
import { NouisliderComponent } from 'ng2-nouislider';
import { log } from 'util';


import { GenericValidator } from '../common/generic-validator';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {

  public someRange: number[] = [2, 8];
  public myform: FormGroup;

  reccount: any = {};
  to: any;
  from: any;
  basicurl: string;
  currentRole: string;
  utype: string;
  college: string;
  dept: string;
  @ViewChild('accordingtograph') modal: any;
  master_role: string;
  clgs = 'REC';
  section: any;
  newsection: any[];
  year: any;
  newyear: any[];
  newbranch: any[];
  newcourse: any[];
  addnew: any;
  branchdata: any;
  sectiondata: any;
  yeardata: any;
  coursedata: any;
  collegedata: any;
  details = [];
  add: any = {};
  token = localStorage.getItem('currentUser');
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  dropdownSettings = {};
  clgbr = [];

  myOptionsclgedit = [];
  myoptions = [];
  companydetails = [];

  options2: Object;
  options3: Object;
  options4: object;
  gridchart: object;
  blockgraph: object;
  companyinformation: object;
  brancharray = [];
  defaultbrarray: any;
  backlogs = [];
  branchid12 = [];
  date1 = '';
  d = new Date();


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    private _formBuilder: FormBuilder) {
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.validationMessages = {
      defclgbr: {
        required: 'Please Select College & Branch.'
      },
      backlogs: {
        required: 'Please Select Backlogs ranger'
      },
      percentage: {
        required: 'Please Select Percentage ranger'
      }
    };

  }



  ngOnInit() {
    this.basicurl = this._apiService.basicurl;
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.getCollege();
    this.getBranchdata();
    this.getCourse();
    this.getYear();
    this.getsection();
    this.getassignedrole();
    this.getCompaniesData();
    this.getclgbr();
    this.getregistrationaddcom();
    console.log(new Date().getFullYear().toString().substr(-2));
    this.date1 = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate();
    console.log(this.date1, 'date1');

    this.utype = localStorage.getItem('utype');
    this.master_role = localStorage.getItem('master_role');
    this.college = localStorage.getItem('college');
    this.dept = localStorage.getItem('dept');
    this._apiService.page = "dashboard";

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select College & branch",
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      // maxHeight: 300,
    };

    this.myform = this._formBuilder.group({
      'defclgbr': [[], [Validators.required]],
      'backlogs': [[0, 2]],
      'percentage': [[60, 100]]
    });


    console.log(this.myform);
  }


  ngAfterViewInit(): void {
    if (this.myform) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));
      Observable.merge(this.myform.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.myform);
      });
    }
  }

  onChange(event) {
    console.log(event);
  }

  elgibledata = [];
  categories1 = [];
  series1 = [];

  getdatabybackper(myform) {
    console.log(myform);
    this.array1 = this.myform.controls['defclgbr'].value
    this.clgarray = [];
    this.brarray = [];
    for (var i = 0; i < this.array1.length; i++) {
      var clgname = this.array1[i].college_name;
      var brname = this.array1[i].id;
      this.clgarray.push(clgname);
      this.brarray.push(brname);
    }
    console.log(this.clgarray, this.brarray, 'data');
    const body = {};
    body['clgarray'] = this.clgarray.toString();
    body['brarray'] = this.brarray.toString();
    body['percentage1'] = this.myform.controls['percentage'].value[0].toString();
    body['backlogs1'] = this.myform.controls['backlogs'].value[0].toString();
    body['percentage2'] = this.myform.controls['percentage'].value[1].toString();
    body['backlogs2'] = this.myform.controls['backlogs'].value[1].toString();
    console.log(body);

    this._apiService.getdatabybackper(body).subscribe(data => {
      console.log(data);
      this.elgibledata = data.data.data;
      this.categories1 = data.data.categories;
      this.series1 = data.data.series;
      console.log(this.categories1, this.series1);
      Highcharts.getOptions().plotOptions.column.colors = ['#33ff33', '#0080ff',
        '#00bfff', '#ffa64d', '#ffb84d', '#ff80b3', '#ff4d4d', '#ff666'];

      this.blockgraph = {


        chart: {
          type: 'column',
          // width: 680,
          // style: {
          //   height: 100,
          //   width: 100,
          //   position: 'absolute'

          // }
        },

        title: {
          text: 'Stacked column chart using Backlogs & Percentage'
        },
        xAxis: {
          categories: this.categories1
        },
        credits: {
          enabled: false
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Backlogs'
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: 'gray'
            }
          }
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          layout: 'vertical',
          x: 15,
          y: 90,
          floating: true,
          backgroundColor: 'white',
          borderColor: '#CCC',
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        colors: data.data.colors,
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true,
              color: 'white',
              colorByPoint: true
            }
          }
        },
        series: data.data.series
      }
    });


  }

  clearform(form) {
    this.elgibledata = [];
    // this.myform.reset();
    // form.reset();
    this.myform = this._formBuilder.group({
      'defclgbr': [[]],
      'backlogs': [[0, 2]],
      'percentage': [[60, 100]]
    });
    this.categories1 = [];
    this.series1 = [];
  }


  getclgbr() {
    this._apiService.collegebranch().subscribe(data => {
      console.log(data, 'data test for multiselect');

      this.clgbr = data.data.data;
      // this.branchid12 = data.data.data;
      console.log(this.clgbr, this.clgbr[0], 'college,branches');
    });
  }

  send(event) {
    console.log(event, 'choosed data');
    this.array1 = event
    this.clgarray = [];
    this.brarray = [];
    this.total_sum = '';
    // this.branchid = [];
    for (var i = 0; i < this.array1.length; i++) {
      var clgname = this.array1[i].college_name;
      var brname = this.array1[i].id;
      this.clgarray.push(clgname);
      this.brarray.push(brname);
    }
    console.log(this.clgarray, this.brarray, 'data');
    const body = {};
    body['clgarray'] = this.clgarray.toString();
    body['brarray'] = this.brarray.toString();
    this._apiService.getbranchwisedata(body).subscribe(data => {
      console.log(data);
      this.finaltable = data.data.data;
      for (let gh = 0; gh < this.finaltable.length; gh++) {
        this.sumvalue[gh] = 0;

      }
      // f.resetForm();
    });

  }


  getassignedrole() {
    console.log('assigned');
    const dashboardData = {};
    dashboardData['reg_no'] = localStorage.getItem('reg_no');
    dashboardData['utype'] = localStorage.getItem('utype');
    this._apiService.getassignedrole(dashboardData).subscribe(data => {
      console.log(data.data.success, data.success, 'success');
      if (data.data.success == true && data.data.data.role == 'placement_officier') {
        this.currentRole = data.data.data.role;
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
      else if (data.data.success == true && data.data.data.role == 'hod') {
        this.currentRole = data.data.data.role;
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
      else if (data.data.success == true && data.data.data.role == 'asst_hod') {
        this.currentRole = data.data.data.role;
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
      else if (data.data.success == false) {
        this.currentRole = "adm";
        console.log(this.currentRole, 'currentrole');
        localStorage.setItem('currentrole', this.currentRole);
      }
    });
  }

  loading: boolean = false;
  branches: any;
  graphbyclgid = [];
  getStudentsplaced() {
    this._apiService.studentsplacedbyid()
      .subscribe(data => {
        if (data.success) {
          this.details = data.data;
          console.log(this.details, 'test1');
        }
      });

  }

  // loading = false;
  placeddata(id) {
    this.loading = true;
    this.getStudentsplaced();
  }
  placeddataclose(id) {
    this.loading = false;
    this.getStudentsplaced();
  }

  loading1 = false;
  graphdata = [];
  branchwisedata = [];
  studentwisedata = [];
  placedgraf(id, clgs) {
    this.loading1 = true;
    this.graphdata = [];
    this.graphbox2 = false;
    this.graphbox1 = false;
    this.clgs = id.clg_fullname;
    const body = {};
    console.log(id, clgs, 'graph data');

    body['college_id'] = id.college_name;
    this._apiService.getCompanyListbyclgid(body).subscribe(data => {
      this.graphdata = data.data.data;
      console.log(data, 'getCompanyListbyclgid');

      this.graphbyclgid = [];
      for (var i = 0; i < this.graphdata.length; i++) {
        this.graphdata[i].y = JSON.parse(this.graphdata[i].y);
      }

      this.companyinformation = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          width: 500,
          type: 'pie'
        },
        title: {
          text: 'Company Information'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: { enabled: false },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            slice: true,
            selected: true,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              // style: {
              //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              // }
            }
          }
        },
        series: [{
          name: 'Companies',
          colorByPoint: true,
          data: this.graphdata,

        }]
      };
    });
  }

  onChartSelection(e) {
    console.log('onChartSelection', e);
  }

  testgo() {
    console.log('testgo');
    window.scrollTo(0, 500);
  }

  testdown() {
    console.log('testdown');
    window.scrollTo(0, 0);
  }

  graphbox1: boolean;
  graphbox2: boolean;
  firstclose: boolean;
  secondclose: boolean;
  company_name = '';
  getdatabyclgcmpid(data) {
    console.log(data);
    this.graphbox1 = true;
    this.firstclose = true;
    this.graphbox2 = false;
    this.company_name = data.name;
    const body = {};
    body['college_id'] = data.college_name;
    body['company_id'] = data.company_id;
    this._apiService.getDatabyclgcmpid(body).subscribe(data => {
      this.branchwisedata = data.data.data;
      console.log(data, 'getdatabyclgcmpid');
    });
  }

  getstddatabygraph(data2) {
    console.log(data2);
    this.graphbox2 = true;
    this.firstclose = false;
    this.secondclose = true;
    const body = {};
    this.branch_name = data2.branch;
    body['college_id'] = data2.college;
    body['company_id'] = data2.company_id;
    body['branch_id'] = data2.br_id;
    this._apiService.getStddataingraph(body).subscribe(data => {
      this.studentwisedata = data.data.data;
      console.log(data, 'getstddatabygraph');
    });
  }

  closefirst() {
    this.firstclose = false;
    this.graphbox1 = false;
  }

  closesecond() {
    this.firstclose = true;
    this.secondclose = false;
    this.graphbox2 = false;
  }

  placedgrafclose(id) {
    this.loading1 = false;
  }

  //manoj...
  getCollege() {
    this._apiService.getCollege().subscribe(data => {
      console.log(data, 'college data')
      this.collegedata = data.data;
    });
  }

  getCourse() {
    this._apiService.getCourse().subscribe(data => {
      console.log(data, 'course data');
      this.coursedata = data.data;
      console.log(this.coursedata)
    })
  }

  getYear() {
    this._apiService.getYear().subscribe(data => {
      console.log(data, 'year data');
      this.yeardata = data.data;
    })
  }

  getsection() {
    this._apiService.getSection().subscribe(data => {
      console.log(data, 'section data');
      this.sectiondata = data.data;
    })
  }

  elgiblecandidates: boolean;
  companyinfo1: boolean;
  chart: boolean = true;
  chartopen() {
    this.elgiblecandidates = false;
    this.companyinfo1 = false;
    this.chart = true;
  }

  elgiblelistopen() {
    this.elgiblecandidates = true;
    this.companyinfo1 = false;
    this.chart = false;
  }

  closeelgiblelist() {
    this.elgiblecandidates = false;
    this.chart = true;
  }

  companywiseopen() {
    this.companyinfo1 = true;
    this.chart = false;
    this.elgiblecandidates = false;
  }

  closecompanyinfo() {
    this.companyinfo1 = false;
    this.chart = true;
  }

  branchdata1: any = [];
  getBranchdata() {
    this._apiService.getBranchdata().subscribe(data => {
      console.log(data, 'branch data');
      this.branchdata = data.data;
      this.branchdata1['value'] = [];
      this.branchdata1.value['branchid'] = this.branchdata;
      // this.onSelectAll(this.branchdata1.value.branchid);
      this.save(this.branchdata1);
    })
  }

  callcollege(value) {
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.newcourse = [];
    console.log('coming', this.coursedata, );
    let clg = '';
    for (var j = 0; j < this.coursedata.length; j++) {
      if (this.addnew == this.coursedata[j].cid) {
        clg = this.coursedata[j].college;
        break;
      }
    }
    for (var i = 0; i < this.coursedata.length; i++) {
      if (clg == this.coursedata[i].college) {
        this.newcourse.push(this.coursedata[i]);
        console.log('testing');
      }
    }
    console.log('coming', this.coursedata, this.newcourse);
  }

  callcourse(value) {
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.newbranch = [];
    console.log('coming data', this.branchdata);
    let branch = '';
    for (var j = 0; j < this.branchdata.length; j++) {
      if (this.addnew == this.branchdata[j].course_id) {
        this.newbranch.push(this.branchdata[j]);
        console.log(this.newbranch, 'dfaksdfhasdhfjasfsdf');
      }
    }
    console.log('coming data', this.branchdata, this.newbranch)
  }

  callbranch(value) {
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.newyear = [];
    let year = '';
    console.log('coming data', this.yeardata);
    for (var j = 0; j < this.yeardata.length; j++) {
      if (this.addnew == this.yeardata[j].bid) {
        year = this.yeardata[j].year;
        this.newyear.push(this.yeardata[j]);
        console.log(year, 'year data');
      }
    }
    console.log('coming data', this.yeardata, this.newyear);
  }

  callyear(value) {
    console.log(value.target.value);
    this.section = value.target.value;
    console.log(this.section, 'section data testing');
    this.newsection = [];
    let newsectiondata = '';
    console.log('coming data', this.sectiondata);
    for (var j = 0; j < this.sectiondata.length; j++) {
      if (this.section == this.sectiondata[j].year) {
        newsectiondata = this.sectiondata[j].section;
        this.newsection.push(this.sectiondata[j]);
        console.log(newsectiondata, 'new section data');
      }
    }
    console.log('coming data', this.sectiondata, this.newsection);
  }

  callsection(value) {
    console.log(value.target.value);
  }
  // manoj end

  // graf
  companiedata = [];
  placed = [];
  stdplaced;
  placed_data = [];
  placed_data1 = [];
  temp_placed;
  temp_placed1;
  college_count = [];
  branchs_count = [];
  branchesdata = [];
  detail = [];
  backlogs_count = [];
  c_std_placed = [];
  csebacklogs = [{
    'cse_backlogs': '',
    'backlogs': '',
    'branch': '',
  }];

  sumvalue = [];
  total_sum;

  getsumstd(event, data, rowid) {
    this.total_sum = '';
    console.log(event.target.checked, data, rowid);
    if (event.target.checked) {
      this.sumvalue[rowid] = parseInt(this.sumvalue[rowid]) + parseInt(data);
      this.total_sum = this.sum(this.sumvalue);
      console.log(this.sumvalue, this.total_sum)

    }
    else {
      this.sumvalue[rowid] = parseInt(this.sumvalue[rowid]) - parseInt(data);
      this.total_sum = this.sum(this.sumvalue);
      console.log(this.sumvalue)
    }
  }

  getupcomingcmp(id, compare) {
    console.log(id, compare);
    if (id == 'equal') {
      this.getregistrationaddcom();
    } else {
      this.companydetails = [];
      const body = {};
      body['id'] = id;
      body['compare'] = compare;
      this._apiService.getUpcomingcmp(body).subscribe(data => {
        this.companydetails = data.data.data;
        console.log(data);
      });
    }
  }

  sum(input) {

    if (toString.call(input) !== "[object Array]")
      return false;

    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        continue;
      }
      total += Number(input[i]);
    }
    return total;
  }


  getCompaniesData() {
    this._apiService.getCompaniesData().subscribe(data => {
      console.log(data);
      if (data.success) {
        let deta = {}
        this.details = data.data.data;
        this.detail = data.data.company_date;
        this.placed = data.data.placed;
        this.college_count = data.data.clg_count;
        this.branchs_count = data.data.branch_count;
        this.backlogs_count = data.data.backlogs_count;
        this.stdplaced = data.data.stdplaced.count;
        this.c_std_placed = data.data.c_selected_std;
        console.log(this.details, 'first table');
        // rec backlogs
        // for (var i = 0; i < this.backlogs_count.length; i++) {
        //   if (this.backlogs_count[i].br_name == 'CSE') {
        //     var backlogdata = this.backlogs_count[i].count;
        //     var baclog1 = this.backlogs_count[i].backlogs;
        //     var br = this.backlogs_count[i].br_name;
        //     this.csebacklogs.push({
        //       cse_backlogs: backlogdata,
        //       backlogs: baclog1,
        //       branch: br,
        //     });
        //     if (this.backlogs_count[i].br_name == 'CIVIL') {
        //       var backlogdata = this.backlogs_count[i].count;
        //       var baclog1 = this.backlogs_count[i].backlogs;
        //       var br = this.backlogs_count[i].br_name;
        //       this.csebacklogs.push({
        //         cse_backlogs: backlogdata,
        //         backlogs: baclog1,
        //         branch: br,
        //       });
        //     }
        //   }
        // }
        console.log(this.csebacklogs, 'table');


        // rec graph
        this.temp_placed = JSON.parse(this.placed[0].placed);
        this.companiedata = [];
        for (var i = 0; i < this.details.length; i++) {
          this.details[i].y = JSON.parse(this.details[i].y);
        }
        this.companiedata = this.details;
        this.placed_data.push({ name: 'Placed', y: this.temp_placed });
        this.placed_data.push({ name: 'Unplaced', y: 100 - this.temp_placed })

        this.options2 = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 500,
            type: 'pie'
          },
          exporting: { enabled: false },
          credits: {
            enabled: false
          },
          title: {
            text: 'Company Information'
          },
          legend: {
            enabled: true,
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              slice: true,
              selected: true,
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                // style: {
                //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                // }
              }
            }
          },
          series: [{
            name: 'Branches',
            colorByPoint: true,
            data: this.companiedata,

          }]
        };

        this.options4 = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            // width: 450,
            // borderWidth: 1,
            BackgroundColor: '#ecf0f1',
            type: 'pie'
          },
          title: {
            text: 'Company Information'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          exporting: { enabled: false },
          credits: {
            enabled: false
          },
          plotOptions: {
            pie: {
              size: 300,
              allowPointSelect: true,
              cursor: 'pointer',
              slice: true,
              selected: true,
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              },
              point: {
                events: {
                  click: function (event) {
                    // this.modal.open();
                    alert(this.x + " " + this.y + " " + this.company_id);
                    this.opengraph(this.company_id);
                  }
                }
              }
            }
          },
          series: [{
            name: 'Placed',
            colorByPoint: true,
            data: this.companiedata,
            point: {
              events: {
                click: function (event) {
                  const p = event.point
                  // alert(p.x + " " + p.y + " " + p.company_id + " " + p.name);
                  this.opengraph(p.company_id, p.name, p.y);
                }.bind(this)
              }
            }

          }]
        };

        this.options3 = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 280,
            type: 'pie'
          },
          exporting: { enabled: false },
          credits: {
            enabled: false
          },
          title: {
            text: 'Total Students Placed'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                // style: {
                //     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                // }
              }
            }
          },
          series: [{
            name: 'Total Placed',
            colorByPoint: true,
            data: this.placed_data,
          }]
        };

        this.gridchart = {
          chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: 1
          },


          title: {
            text: 'Raghu Engg College Percentage Chart'
          },

          xAxis: {
            categories: ['CSE', 'MECH', 'EEE', 'ECE', 'CIVIL']
          },

          yAxis: {
            categories: ['0', '1', '2', '3', '4'],
            title: null
          },

          colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[4]
          },

          legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
          },

          tooltip: {
            formatter: function () {
              return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> Branch <br><b>' +
                this.point.value + '</b> Students with<br><b>' + this.series.yAxis.categories[this.point.y] + '</b> Backlogs <br><b>';
            }
          },

          series: [{
            name: 'Sales per employee',
            borderWidth: 1,
            data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115]],
            dataLabels: {
              enabled: true,
              color: '#000000'
            }
          }]
        };
      }
    });

  }

  acccompany_name = '';
  acccompany_count = '';
  acccompany_id;
  allstddata = [];
  recdata = [];
  ritdata = [];
  rcpdata = [];
  ritcount = [];
  rcpcount = [];
  opengraph(id, name, y) {
    console.log(id, name, y, 'graph');
    this.acccompany_name = name;
    this.acccompany_count = y;
    this.acccompany_id = id;
    const body = {};
    body['company_id'] = id;
    this._apiService.getbygraphbyid(body).subscribe(data => {
      console.log(data);
      this.allstddata = data.data.allstddata;
      this.recdata = data.data.REC;
      this.reccount = data.data.REC_count;
      this.ritdata = data.data.RIT;
      this.ritcount = data.data.RIT_count;
      this.rcpdata = data.data.RCP;
      this.rcpcount = data.data.RCP_count;
    });
    this.modal.open();
  }

  opentabledata(id) {
    console.log(id);
    this.allstddata = [];
    const body = {};
    body['company_id'] = id.company_id;
    body['college_id'] = id.clg_id;
    body['branch_id'] = id.br_id;
    this._apiService.getDatabybranch(body).subscribe(data => {
      this.allstddata = data.data.data;
    });
  }

  opengraphbyclg(dataform) {
    console.log(dataform);
    this.allstddata = [];
    // {college: "REC", college_id: "1", company_id: "41", count: "8"}
    const body = {};
    body['college_id'] = dataform.college_id;
    body['company_id'] = dataform.company_id;
    this._apiService.getstdDatabyclgcmpid(body).subscribe(data => {
      this.allstddata = data.data.data;
      console.log(data);

    });
  }

  name: string;

  records: any[] = [
    {
      "count": 19
    },
    {
      "count": 27
    },
    {
      "count": 24
    },
    {
      "count": 12
    }
  ];

  totalCounts(data) {
    let total = 0;

    data.forEach((d) => {
      total += parseInt(d.count, 10);
    });

    return total;
  }

  recopen: boolean;
  ritopen: boolean;
  openreccoll() {
    this.recopen = true;
  }
  openritcoll() {
    this.ritopen = true;

  }

  array1 = [];
  clgarray = [];
  brarray = [];
  finaltable = [];
  save(f) {
    console.log(f.value, 'data1');
    this.array1 = f.value.branchid
    this.clgarray = [];
    this.brarray = [];
    // this.branchid = [];
    for (var i = 0; i < this.array1.length; i++) {
      var clgname = this.array1[i].college_name;
      var brname = this.array1[i].id;
      this.clgarray.push(clgname);
      this.brarray.push(brname);
    }
    console.log(this.clgarray, this.brarray, 'data');
    const body = {};
    body['clgarray'] = this.clgarray.toString();
    body['brarray'] = this.brarray.toString();
    this._apiService.getbranchwisedata(body).subscribe(data => {
      console.log(data);
      this.finaltable = data.data.data;
      for (let gh = 0; gh < this.finaltable.length; gh++) {
        this.sumvalue[gh] = 0;

      }
      // f.resetForm();
    });
  }

  onItemSelect(item: any) {
    console.log(item, 'actual data');
  }
  OnItemDeSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items, 'any');
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  opencompanieslist() {

  }

  c_data = [];
  clgdata = [];
  stddata = [];
  openacccom: boolean;
  firstbox: boolean;
  secondbox: boolean;
  thirdbox: boolean;
  com_name = '';
  branch_name = '';
  opencols(item) {
    this.openacccom = true;
    this.openacccoll = false;
    this.openaccbrach = false;
    this.com_name = item.company;
    this.firstbox = true;
    const body = {};
    body['company_id'] = item.fid;
    this._apiService.getDatabycid(body).subscribe(data => {
      console.log(data);
      this.c_data = data.data.data;
    });
    console.log(item);
  }

  openacccoll: boolean;
  clg_name = '';
  openacccoll1(data2) {
    this.openacccoll = true;
    this.openaccbrach = false;
    this.firstbox = false;
    this.secondbox = true;
    const body = {};
    this.clg_name = data2.college
    body['college_id'] = data2.college_id;
    body['company_id'] = data2.company_id;
    this._apiService.getDatabyclg(data2).subscribe(data => {
      this.clgdata = data.data.data;
      console.log(data);

    });

    console.log(data2);
  }

  openaccbrach: boolean;
  openaccbranch(data3) {
    this.openaccbrach = true;
    this.secondbox = false;
    this.firstbox = false;
    this.thirdbox = true;
    this.branch_name = data3.branch;
    console.log(data3, 'data3');
    const body = {};
    body['college_id'] = data3.college;
    body['company_id'] = data3.company_id;
    body['branch_id'] = data3.br_id;
    this._apiService.getDatabybranch(body).subscribe(data => {
      this.stddata = data.data.data;
      console.log(this.stddata);
    });


  }

  getregistrationaddcom() {
    this._apiService.getregistrationaddcom().subscribe(ques => {
      console.log(ques, 'test');
      this.companydetails = ques.data;
      console.log(this.companydetails, 'companies list');
    });
  }

  closethirdbox() {
    this.secondbox = true;
    this.thirdbox = false;
    this.openaccbrach = false;
  }

  closesecondbox() {
    this.secondbox = false;
    this.openacccoll = false;
    this.firstbox = true;
  }

  closefirstbox() {
    this.firstbox = false;
    this.openacccom = false;
  }

}
