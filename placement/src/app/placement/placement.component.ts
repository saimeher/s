import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControlName } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { GenericValidator } from '../common/generic-validator';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { ApiService } from '../services/api.service';
import { ModalModule } from "ngx-modal";
import { log } from 'util';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css']
})
export class PlacementComponent implements OnInit {
  college_name: any;
  newplacementdata: boolean;
  showaddbtn: boolean;
  selfdata: boolean;
  placementdetailsbyid= [];
  placementdata: any;
  search: any;
  cid: any;
  college: any;
  newcourse: any;
  rowdata: any = {};
  course: any;
  newbranch: any;
  branch: any;
  newyear: any;
  year: any;
  addnew: any;
  addsection: any;
  section: any;
  sectiondata: any;
  yeardata: any;
  branchdata: any;
  coursedata: any;
  collegedata: any;
  totalcount: any;
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  detail = [];
  id: any = {};
  searchform: FormGroup;
  placementForm: FormGroup;

  @ViewChild('mymodal') modal1: any;
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
        maxLength: 'College Name should be less than 255 characters'
      },
      course: {
        required: 'course Name is required',
        maxLength: 'course Name should be less than 255 characters'
      },
      branch: {
        required: 'Depatment Name is required',
        maxLength: 'Depatment Name should be less than 255 characters'
      },
      year: {
        required: 'Year is required',
        maxLength: 'year should be less than 255 characters'
      },
      section: {
        required: 'Section is required',
        maxLength: 'section should be less than 255 characters'
      },
      c_name: {
        required: 'course Name is required',
        maxLength: 'course Name should be less than 255 characters'
      },
      c_location: {
        required: 'Depatment Name is required',
        maxLength: 'Depatment Name should be less than 255 characters'
      },
      c_package: {
        required: 'Year is required',
        maxLength: 'year should be less than 255 characters'
      },
      c_drive_disciple: {
        required: 'Section is required',
        maxLength: 'section should be less than 255 characters'
      }
    };
  }

  ngAfterViewInit(): void {
    if (this.searchform) {
      this.modal1.close();
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.searchform.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.searchform);
      });
    }
    if (this.placementForm) {
      this.modal1.close();
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.placementForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.placementForm);
      });
    }
  }

  ngOnInit() {

    this._apiService.page = "placement";
    this.getCollege();
    this.getBranchdata();
    this.getCourse();
    this.getsection();
    this.getYear();
    this.default_value();
    // this.getStudentsdata();
    this.getcompanies();
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.searchform = this.fb.group({
      'college_name': ['', [Validators.required, Validators.maxLength(255)]],
      'branch': ['', [Validators.required, Validators.maxLength(255)]],
      'course': ['', [Validators.required, Validators.maxLength(255)]],
      'year': ['', [Validators.required, Validators.maxLength(255)]],
      'section': ['', [Validators.required, Validators.maxLength(255)]],
    });
    this.placementForm = this.fb.group({
      'c_name': ['', [Validators.required, Validators.maxLength(255)]],
      'c_location': ['', [Validators.required, Validators.maxLength(255)]],
      'c_package': ['', [Validators.required, Validators.maxLength(255)]],
      'c_drive_disciple': ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  searchdata() {
    const value = {
      college_name: this.searchform.controls['college_name'].value,
      branch: this.searchform.controls['branch'].value,
      course: this.searchform.controls['course'].value,
      year: this.searchform.controls['year'].value,
      section: this.searchform.controls['section'].value.toString()
    }
    this._apiService.searchdata(value).subscribe(data => {
      this.totalcount = data.length;
      this.search = data.data;
      console.log(this.search, this.totalcount, 'testing for the search data');
    })
  }
  default_value() {
    this.college_name = 1,
      this.branch = 1,
      this.course = 1,
      this.year = 4,
      this.section = 1
  }


  addfunction() {
    this.newplacementdata = true;
    this.showaddbtn = false;
    this.selfdata = false;
  }

  placementdetails(data) {
    // console.log(data, 'testing rowdata data');
    status = '1';
    const value = {
      c_company: this.placementForm.controls['c_name'].value,
      c_location: this.placementForm.controls['c_location'].value,
      c_package: this.placementForm.controls['c_package'].value,
      c_drive_disciple: this.placementForm.controls['c_drive_disciple'].value,
      'status': status,
      'reg_no': data.university_reg_number
    }
    this._apiService.placementdetails(value).subscribe(data => {
      if (data.data.success == true) {
        this.toastr.success('successfully added', 'Success!!');
        this.placementdata = data.data;
        this.placementForm.reset()
        this.modal1.close();
        this.searchdata();
        console.log(this.placementdata, 'testing placement Data');
      } else {
        this.toastr.warning('Data Duplicated', 'Warning!!');
      }
    })
  }

  placementdetailid =[];

  placementdatabyID(data) {
    console.log(data, 'testing to bring data by id');
    const value = {
      'reg_no': data.university_reg_number
    }
    this._apiService.placementdetailsbyid(value).subscribe(data => {
      this.placementdetailsbyid = data.data;
      this.placementdetailid = data.data;
      console.log(this.placementdetailsbyid, 'testing plcaement details by id');
      // this.modal1.open();
      this.selfdata = true;
      this.showaddbtn = true;
      this.newplacementdata = false;
    })
  }

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
      section: ''
    });

    console.log(value.target.value);
    this.addnew = value.target.value;
    this.college = value.target.value;
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
    //to clear next values
    this.newbranch = [];
    this.newyear = [];
    this.addsection = [];
    this.searchform.patchValue({
      branch: '',
      year: '',
      section: ''
    });

    console.log(value.target.value);
    this.addnew = value.target.value;
    this.course = value.target.value;
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

    //to clear next values
    this.newyear = [];
    this.addsection = [];
    this.searchform.patchValue({
      year: '',
      section: ''
    });

    console.log(value.target.value);
    this.addnew = value.target.value;
    this.branch = value.target.value;
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
    this.newyear.splice(0, 3);
    console.log('coming data', this.yeardata, this.newyear);
  }
  callyear(value) {
    //to clear next values
    this.addsection = [];
    this.searchform.patchValue({
      section: ''
    });
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.year = value.target.value;
    console.log(this.addnew);
    this.addsection = [];
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

  companydetails = [];
  getcompanies() {
    this._apiService.getCompanies().subscribe(data => {
      console.log(data, 'course data');
      this.companydetails = data.data.data;
      console.log(this.coursedata)
    })
  }

  callpackage(value) {
    console.log(value.target.value);
    this.cid = value.target.value;
    console.log(this.companydetails);
    for (var i = 0; i < this.companydetails.length; i++) {
      if (this.cid == this.companydetails[i].fid) {
        this.placementForm.patchValue({
          c_location: this.companydetails[i].location,
          c_package: this.companydetails[i].package,
          // c_name: this.companydetails[i].company,
          c_drive_disciple: this.companydetails[i].drive_dispname,
        });
      }
    }
  }

}