import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControlName } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';


import { GenericValidator } from '../common/generic-validator';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../services/api.service';
import { ModalModule } from "ngx-modal";

import { CKEditorModule } from 'ng2-ckeditor';

@Component({
  selector: 'app-stdshortlist',
  templateUrl: './stdshortlist.component.html',
  styleUrls: ['./stdshortlist.component.css']
})
export class StdshortlistComponent implements OnInit {

  optionsModel: number[];
  myOptions: IMultiSelectOption[];

  sectiondata: any[];
  rowdata: any = {};
  // title: any;
  yeardata: any[];
  branchdata: any[];
  college_fullname: any;
  branchid: any;
  newyeardata: any[];
  clg_data: any[];
  collegeid: any;
  search: any;
  section: any;
  addsection: any[];
  year: any;
  newyear: any[];
  branch: any;
  newbranch: any[];
  course: any;
  newcourse: any[];
  addnew: any;
  searchform: FormGroup;
  emailform: FormGroup;

  details = [];
  details1 = [];
  totalcount: any;


  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";

  college: any;
  dept: any;
  fullname: any;
  clg_fulname: any;
  clg_id: any;
  eid: any = [];
  id: any = [];
  collegedata: any = [];
  coursedata: any = [];
  branchno;
  ckeditorContent = '';
  @ViewChild('crosscheck') modal: any;
  // @ViewChild('verfication') modal1: any;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.validationMessages = {
      college_name: {
        required: 'College Name is required',
        // maxLength: 'College Name should be less than 255 characters'
      },
      branch: {
        required: 'Branch Name is required',
        // maxLength: 'Depatment Name should be less than 255 characters'
      },
      course: {
        required: 'Course Name is required',
        // maxLength: 'Depatment Name should be less than 255 characters'
      },
      year: {
        required: 'Year is required',
        //  maxLength: 'year should be less than 255 characters'
      },
      percentage: {
        required: 'Percentage is required',
        // maxLength: 'Depatment Name should be less than 255 characters'
      },
      backlogs: {
        required: 'Backlogs is required',
        //  maxLength: 'year should be less than 255 characters'
      },
      section: {
        required: 'Section is required',
        //  maxLength: 'section should be less than 255 characters'
      }
    };
  }

  mySettings: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default btn-square',
    dynamicTitleMaxItems: 5,
    displayAllSelectedText: false,
    closeOnClickOutside: true,
    fixedTitle: true
  };

  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  ngAfterViewInit(): void {
    if (this.searchform) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.searchform.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.searchform);
      });
    }
    if (this.emailform) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.emailform.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.emailform);
      });
    }
  }
  ngOnInit() {
    this._apiService.page = "stdshortlist";
    this.college = localStorage.getItem('college');
    this.dept = localStorage.getItem('dept');
    // console.log(this.college, this.dept, 'college,dept');

    this.myOptions = [
      { id: 0, name: '0' },
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
      { id: 4, name: '4' },
    ];
    // this.callcollegeid();
    // this.getStudentsdata();
    this.getcollegedept();
    // this.getyearsection();
    this.getBranchdata();
    this.getCollege();
    this.getCourse();
    this.getYear();
    this.getsection();
    this.getdataofstf();
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.searchform = this.fb.group({
      'college_name': ['', [Validators.required, Validators.maxLength(255)]],
      'branch': ['', [Validators.required, Validators.maxLength(255)]],
      'course': ['', [Validators.required, Validators.maxLength(255)]],
      'year': ['', [Validators.required, Validators.maxLength(255)]],
      'section': ['', [Validators.required, Validators.maxLength(255)]],
      'percentage': ['', [Validators.required, Validators.maxLength(255)]],
      'backlogs': ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.emailform = this.fb.group({
      'toemail': ['', [Validators.required]],
      'fromemail': ['', [Validators.required]],
      'ccmail': ['', [Validators.required]],
      'subject': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });
  }

  colleges = [];
  getcollegedept() {
    this._apiService.getColldept()
      .subscribe(data => {
        if (data.success) {
          this.colleges = data.data;
          console.log(this.details, 'test1');
        }
      });
  }

  loading: boolean = true;
  loading1: boolean = false;
  loading2: boolean = false;

  detail = [];
  getStudentsdata() {
    this._apiService.studentsdatabyid()
      .subscribe(data => {
        if (data.success) {
          this.detail = data.data;
          console.log(this.detail, 'test1');
        }
      });
  }
  getCollege() {
    this._apiService.getCollege().subscribe(data => {
      console.log(data, 'college data');
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
  getBranchdata() {
    this._apiService.getBranchdata().subscribe(data => {
      console.log(data, 'branch data');
      this.branchdata = data.data;
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
  setnewcourse = [];
  callcollege(value) {
    //to clear next values
    this.newcourse = [];
    this.newbranch = [];
    this.newyear = [];
    this.addsection = [];

    this.searchform.patchValue({
      course: '',
      branch: '',
      year: '',
      section: '',
      percentage: '',
      backlogs: ''
    });

    console.log(value.target.value);
    this.addnew = value.target.value;
    this.college = value.target.value;
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


    // this.setnewcourse.push(this.newcourse);
    console.log('coming', this.coursedata, this.newcourse, this.setnewcourse);
  }

  callcourse(value) {
    //to clear next values
    this.newbranch = [];
    this.newyear = [];
    this.addsection = [];

    this.searchform.patchValue({
      branch: '',
      year: '',
      section: '',
      percentage: '',
      backlogs: ''
    });

    console.log(value.target.value);
    this.addnew = value.target.value;
    this.course = value.target.value;
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
    //to clear next values
    this.newyear = [];
    this.addsection = [];

    this.searchform.patchValue({
      year: '',
      section: '',
      percentage: '',
      backlogs: ''
    });

    console.log(value.target.value);
    this.addnew = value.target.value;
    this.branch = value.target.value;
    let year = '';
    console.log('coming data', this.yeardata);
    for (var j = 0; j < this.yeardata.length; j++) {
      if (this.addnew == this.yeardata[j].bid) {
        year = this.yeardata[j].year;
        this.newyear.push(this.yeardata[j]);
        console.log(year, 'year data');
      }
    }
    this.newyear.splice(0, 3);
    console.log('coming data', this.yeardata, this.newyear);
  }

  callyear(value) {
    //to clear next values
    this.addsection = [];
    this.searchform.patchValue({
      section: '',
      percentage: '',
      backlogs: ''
    });

    console.log(value.target.value);
    this.addnew = value.target.value;
    this.year = value.target.value;
    console.log(this.addnew);
    let section = '';
    var newsections = [];
    var gh = 0;
    console.log('coming data', this.sectiondata);
    for (var j = 0; j < this.sectiondata.length; j++) {
      if (this.addnew == this.sectiondata[j].year) {
        // section=this.sectiondata[j].section;
        newsections[gh] = new Object()
        newsections[gh] = this.sectiondata[j];
        gh++;
        console.log(newsections, 'section datass');
      }
    }
    this.addsection[0] = new Object();
    // this.addsection[0] = newsections[0];
    var fdval = '';

    for (let kj = 0; kj < newsections.length; kj++) {
      this.addsection[(kj) + 1] = newsections[kj];
      if (newsections.length - 1 == kj) {
        fdval = fdval + newsections[kj]['id']
      } else {
        fdval = fdval + newsections[kj]['id'] + ','
      }
    }

    this.addsection[0]['id'] = fdval;
    this.addsection[0]['section'] = 'ALL'


    console.log('coming data', this.sectiondata, this.addsection);
  }
  callsection(value) {
    console.log(value.target.value);
    this.section = value.target.value;
    console.log(this.section, 'section id data');
  }

  stdsendsms = [];
  checkbyper(form) {
    console.log(form);
    var data1 = [];
    data1 = this.searchform.controls['backlogs'].value;
    const value = {
      college_name: this.searchform.controls['college_name'].value,
      branch: this.searchform.controls['branch'].value,
      course: this.searchform.controls['course'].value,
      year: this.searchform.controls['year'].value,
      section: this.searchform.controls['section'].value.toString(),
      percentage: this.searchform.controls['percentage'].value,
      backlogs: data1.toString()
    }
    console.log(value, 'searchdata');
    this._apiService.searchdatadetails(value).subscribe(data => {
      this.totalcount = data.data.data.length;
      this.details1 = data.data.data;
      for (var i = 0; i < this.details1.length; i++) {
        this.details1[i].reg_no = '0';
      }
    });
  }

  selectallstd(event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      for (var i = 0; i < this.details1.length; i++) {
        if (this.details1[i].reg_no == '0') {
          this.details1[i].reg_no = '1';
          this.stdsendsms.push(this.details1[i])
        }
      }
    }
    else {
      for (var i = 0; i < this.details1.length; i++) {
        if (this.details1[i].reg_no == '1') {
          this.details1[i].reg_no = '0';
          for (var jk = 0; jk < this.stdsendsms.length; jk++) {
            if (this.stdsendsms[jk]) {
              this.stdsendsms.splice(jk, 1);
            }
          }
        }
      }
    }
    console.log(this.stdsendsms);
  }

  semailtoselectedstd(event, data, id) {
    console.log(event, data, id);
    for (var i = 0; i < this.details1.length; i++) {
      if (this.details1[i].university_reg_number == data && this.details1[i].reg_no == '1') {
        this.details1[i].reg_no = '0';
        for (var lk = 0; lk < this.stdsendsms.length; lk++) {
          if (this.stdsendsms[lk].university_reg_number == data) {
            this.stdsendsms.splice(lk, 1);
            break;
          }
        }
        break;
      }
      if (this.details1[i].university_reg_number == data && this.details1[i].reg_no == '0') {
        this.details1[i].reg_no = '1';
        this.stdsendsms.push(this.details1[i])
        console.log(this.details1[i]);
        break;
      }
    }
    console.log(this.stdsendsms, 'attendance data');
  }

  email: boolean;
  openemail() {
    this.modal.open();
    this.email = true;
  }

  closeemail() {
    this.stdsendsms = [];
    this.email = false;
    this.emailform.reset();
    this.getdataofstf();
  }

  opensendsms(data1) {
    // this.modal1.open();
  }

  sendsms(data) {
    console.log(data);
    const body = {
      toemail: data,
      fromemail: this.emailform.controls['fromemail'].value,
      ccmail: this.emailform.controls['ccmail'].value,
      subject: this.emailform.controls['subject'].value,
      description: this.emailform.controls['description'].value,
    };
    console.log(body);
    this._apiService.sendsmstostd(body).subscribe(data => {
      console.log(data, 'testing search data');
    })
  }

  staffdata: any = [];

  getdataofstf() {
    const body = {};
    body['reg_no'] = localStorage.getItem('reg_no');
    this._apiService.getDatabyreg_no(body).subscribe(data => {
      this.staffdata = data.data.data;
      console.log(this.staffdata, 'email');
      // this.stff_email = this.staffdata.email;
      this.emailform.patchValue({ fromemail: this.staffdata.email });
    })
  }

  placementdetailsbyid = [];
  placementdatabyID(data) {
    console.log(data, 'testing to bring data by id');
    const value = {
      'reg_no': data.university_reg_number
    }
    this._apiService.placementdetailsbyid(value).subscribe(data => {
      this.placementdetailsbyid = data.data;
      console.log(this.placementdetailsbyid, 'testing plcaement details by id');
      // this.modal1.open();
    })
  }

  // Search() {
  //   this._apiService.searchingdata(this.title).subscribe(data => {
  //     console.log(data, 'testing search data');
  //     this.details1 = data.data;
  //     console.log(this.details1, 'testing search details');
  //   })
  // }

  // checkdatabyid() {
  //   this.loading1 = true;
  //   this.loading2 = false;
  //   this.loading = false;
  //   this.searchdata();
  // }

  // closecheckdata() {
  //   this.loading1 = false;
  //   this.loading2 = false;
  //   this.loading = true;
  //   this.searchdata();
  // }

  // approvedatabyid() {
  //   this.loading1 = false;
  //   this.loading2 = true;
  //   this.loading = false;
  //   this.searchdata();
  // }

  // approvestudata(form) {
  //   console.log(this.eid, 'status data');
  //   this._apiService.setstatus(this.id, this.eid)
  //     .subscribe(data => {
  //       console.log(data);
  //       form.resetForm();
  //       this.closecheckdata();
  //     });

  // }
  // getStudentsdata
  // switchchange(event) {
  //   console.log(event, 'changed');
  // }

  // getyearsection() {
  //   const body = {
  //     'college': this.college,
  //     'branch': this.dept
  //   }
  //   this._apiService.getyearsec(body)
  //     .subscribe(data => {
  //       console.log(data, 'college,course,branch');
  //     });
  // }


  // getCollege() {
  //   this._apiService.getCollege().subscribe(data => {
  //     this.collegedata = data.data;
  //     // console.log(this.collegedata, 'college data');
  //     // console.log(this.college, this.dept, 'college,dept');

  //     // front end dynamic printing
  //     for (var i = 0; i < this.collegedata.length; i++) {
  //       if (this.college == this.collegedata[i].college) {
  //         this.clg_fulname = this.collegedata[i].full_name;
  //         this.clg_id = this.collegedata[i].id;
  //         // console.log(this.clg_fulname, this.clg_id, 'college fullname with id');
  //       }
  //     }
  //         // console.log(this.clg_fulname, this.clg_id, 'college fullname with id');
  //   });
  // }
  // getCourse() {
  //   this._apiService.getCourse().subscribe(data => {
  //     console.log(data, 'course data');
  //     console.log(this.collegeid.id);
  //     this.clg_data = [];
  //     this.coursedata = data.data;
  //     for (var j = 0; j < this.coursedata.length; j++) {
  //       if (this.collegeid.id == this.coursedata[j].cid) {
  //         this.clg_data.push(this.coursedata[j]);
  //       }
  //     }
  //     console.log(this.clg_data, 'testing for data');
  //   })
  // }
  // getBranchdata() {
  //   this._apiService.getBranchdata().subscribe(data => {
  //     this.branchdata = data.data;
  //     console.log(this.branchdata, 'branch data');
  //   })
  // }
  // getYear() {
  //   this._apiService.getYear().subscribe(data => {
  //     console.log(data, 'year data');
  //     this.yeardata = data.data;
  //   })
  // }

  // getsection() {
  //   this._apiService.getSection().subscribe(data => {
  //     console.log(data, 'section data');
  //     this.sectiondata = data.data;
  //   })
  // }

  // callcollegeid() {
  //   this._apiService.callcollegeid().subscribe(data => {
  //     console.log(data, 'colleg id data');
  //     this.collegeid = data.data[0];
  //     console.log(this.collegeid, 'testing for college id');
  //   })
  // }

  // callcollege(value) {
  //   console.log(value.target.value);
  //   this.addnew = value.target.value;
  //   this.college = value.target.value;
  //   this.newcourse = [];
  //   console.log('coming', this.coursedata, );
  //   let clg = '';
  //   for (var j = 0; j < this.coursedata.length; j++) {
  //     if (this.addnew == this.coursedata[j].cid) {
  //       clg = this.coursedata[j].college;
  //       break;
  //     }
  //   }
  //   for (var i = 0; i < this.coursedata.length; i++) {
  //     if (clg == this.coursedata[i].college) {
  //       this.newcourse.push(this.coursedata[i]);
  //       console.log('testing');
  //     }
  //   }
  //   console.log('coming', this.coursedata, this.newcourse);
  // }

  // callcourse(value) {
  //   console.log(value.target.value);
  //   this.addnew = value.target.value;
  //   this.course = value.target.value;
  //   this.newbranch = [];
  //   this._apiService.getbranchid(this.course).subscribe(data => {
  //     console.log(data, 'testing for data branch id');
  //     this.branchid = data.data[0];
  //     this.newyeardata = [];
  //     console.log(this.branchid, 'banch id');
  //     console.log(this.branchid.id, 'branch testing');
  //     this.branchno = this.branchid.id;
  //     console.log(this.newbranch, 'tedsting branch new data');
  //     for (var j = 0; j < this.yeardata.length; j++) {
  //       if (this.branchid.id == this.yeardata[j].bid) {
  //         this.newyeardata.push(this.yeardata[j]);
  //       }
  //     }
  //   })
  // }

  // callyear(value) {
  //   console.log(value.target.value);
  //   this.addnew = value.target.value;
  //   this.year = value.target.value;
  //   console.log(this.addnew);
  //   this.addsection = [];
  //   let section = '';
  //   console.log('coming data', this.sectiondata);
  //   for (var j = 0; j < this.sectiondata.length; j++) {
  //     if (this.addnew == this.sectiondata[j].year) {
  //       // section=this.sectiondata[j].sectiothis.reg_Form.controls['btech_year_of_passing']n;
  //       this.addsection.push(this.sectiondata[j]);
  //       console.log(this.addsection, 'section data');
  //     }
  //   }
  //   console.log('coming data', this.sectiondata, this.addsection);
  // }
  //   callsection(value) {
  //   console.log(value.target.value);
  //   this.section = value.target.value; value
  //   console.log(this.section, 'section id data');
  // }

  // searchdata() {
  //   const value = {
  //     college_name: this.searchform.controls['college_name'].value,
  //     branch: this.searchform.controls['branch'].value,
  //     course: this.searchform.controls['course'].value,
  //     year: this.searchform.controls['year'].value,
  //     section: this.searchform.controls['section'].value
  //   }
  //   console.log(value, 'searchdata');
  //     this._apiService.searchdata(value).subscribe(data => {
  //     this.details = data.data;
  //     console.log(this.details, 'testing for the search data');
  //   })
  // }
}
