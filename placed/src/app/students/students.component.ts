import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from "@angular/forms";
import { ModalModule } from "ngx-modal";
import { CustomValidators } from 'ng2-validation';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from '../common/generic-validator';
import { IMyDpOptions, IMyDateModel, IMyOptions, IMyDate } from 'mydatepicker';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  sectiondata: any[];
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
  studentForm: FormGroup;
  reg_Form: FormGroup;

  details = [];
  did: any = {};

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
  basicurl: string;


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public sanitizer: DomSanitizer,
    private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.validationMessages = {
      college_name: {
        required: 'College Name is required',
        maxLength: 'College Name should be less than 100 characters'
      },
      course: {
        required: 'Course Name is required',
        maxLength: 'Course Name should be less than 100 characters'
      },
      branch: {
        required: 'Branch Name is required',
        maxLength: 'Branch Name should be less than 100 characters'
      },
      year: {
        required: 'Year is required',
        maxLength: 'year should be less than 10 characters'
      },
      section: {
        required: 'Section is required',
        maxLength: 'Section should be less than 10 characters'
      },
      university_reg_number: {
        required: 'Registeration Number is required',
        maxLength: 'Registeration Number should be less than 30 characters'
      },
      first_name: {
        required: 'First Name is required',
        maxLength: 'First Name should be less than 100 characters',
        pattern: 'First Name should be Alphabets',
      },
      last_name: {
        required: 'Last Name is required',
        maxLength: 'Last Name should be less than 100 characters',
        pattern: 'Last Name should be Alphabets',
      },
      gender: {
        required: 'Gender is required',
        maxLength: 'Gender should be less than 10 characters'
      },
      dob: {
        required: 'Date of Birth is required',
        maxLength: 'Date of Birth should be less than 10 characters'
      },
      aadhaar_number: {
        required: 'Aadhaar Number is required',
        maxLength: 'Aadhaar Number should be less than 20 characters',
        pattern: 'Aadhaar Number should be 12 digit number',
      },
      email_id: {
        required: 'Email Id is required',
        maxLength: 'Email Id should be less than 255 characters',
        pattern: 'Email Id should Contain atleast @ , . characters',
      },
      fathers_name: {
        required: 'Father Name is required',
        maxLength: 'Father Name should be less than 100 characters',
        pattern: 'Father Name should be Alphabets',
      },
      mothers_name: {
        required: 'Mother Name is required',
        maxLength: 'Mother Name should be less than 100 characters',
        pattern: 'Mother Name should be Alphabets',
      },
      mobile_number: {
        required: 'Mobile Number is required',
        maxLength: 'Mobile Number should be less than 10 characters ',
        pattern: 'Alternate Mobile number should start with [789]{1}[0-9]{9}'
      },
      alternate_mobile_number: {
        required: 'Alternate Mobile Number is required',
        maxLength: 'Alternate Mobile Number should be less than 10 characters ',
        pattern: 'Alternate Mobile number should start with [789]{1}[0-9]{9}'
      },
      address: {
        required: 'Address is required',
        maxLength: 'Address should be less than 255 characters'
      },
      backlogs: {
        required: 'Backlogs is required',
        maxLength: 'Backlogs should be less than 20 characters',
        pattern: 'you entered number is exceeding 2 digits'
      },
      x_board: {
        required: 'X Board is required',
        maxLength: 'X Board should be less than 50 characters'
      },
      x_percentage: {
        required: 'X percentage is required',
        maxLength: 'X percentage should be less than 50 characters'
      },
      x_year_of_passing: {
        required: 'X year of passing is required',
        maxLength: 'X year of passing should be less than 50 characters'
      },
      xII_board: {
        required: 'XII Board is required',
        maxLength: 'XII Board should be less than 50 characters'
      },
      xII_percentage: {
        required: 'XII Percentage is required',
        maxLength: 'XII Percentage should be less than 50 characters'
      },
      xII_year_of_passing: {
        required: 'XII Year of passing is required',
        maxLength: 'XII Year of passing should be less than 50 characters'
      },
      btech_board: {
        required: 'Btech board is required',
        maxLength: 'Btech board should be less than 50 characters'
      },
      btech_percentage: {
        required: 'Btech percentage is required',
        maxLength: 'Btech percentage should be less than 50 characters'
      },
      btech_year_of_passing: {
        required: 'Btech year of passing is required',
        maxLength: 'Btech year of passing should be less than 50 characters'
      },
      eamcet_rank: {
        required: 'Eamcet Rank is required',
        maxLength: 'Eamcet Rank should be less than 255 characters',
        pattern: 'you entered number is exceeding 6 digits'
      },
      father_proffesion: {
        required: 'Father Proffesion is required',
        maxLength: 'Father Proffesion should be less than 255 characters'
      },
      nationalitiy: {
        required: 'Nationalitiy is required',
        maxLength: 'Nationalitiy should be less than 255 characters',
        pattern: 'Nationalitiy should be Alphabets',
      },
      language_known: {
        required: 'Languages is required',
        maxLength: 'Languages should be less than 255 characters'
      }
    };
  }

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableSince: { year: new Date().getFullYear() - 6, month: new Date().getMonth() + 1, day: new Date().getDate() }
  };


  ngAfterViewInit(): void {
    if (this.studentForm) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.studentForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.studentForm);
      });
    }
  }

  emailRegex;
  mobileex;
  arRegex;
  rankRegex;
  backlogRegex;
  alphabetRegex;
  ngOnInit() {
    this._apiService.page = "students";
    this.basicurl = this._apiService.basicurl;
    this.college = localStorage.getItem('college');
    this.dept = localStorage.getItem('dept');

    // console.log(this.college, this.dept, 'college,dept');
    this.callcollegeid();

    // this.getStudentsdata();
    this.getcollegedept();
    this.getyearsection();
    this.getBranchdata();
    this.getCollege();
    this.getCourse();
    this.getYear();
    this.getsection();
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.studentForm = this.fb.group({
      'college_name': ['', [Validators.required, Validators.maxLength(255)]],
      'dept': ['', [Validators.required, Validators.maxLength(255)]],
      'branch': ['', [Validators.required, Validators.maxLength(255)]],
      'course': ['', [Validators.required, Validators.maxLength(255)]],
      'year': ['', [Validators.required, Validators.maxLength(255)]],
      'section': ['', [Validators.required, Validators.maxLength(255)]],
    });
    this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.mobileex = "[7-9]{1}[0-9]{9}";
    this.arRegex = "[0-9]{12}";
    this.rankRegex = "[0-9]{1,6}";
    this.backlogRegex = "^[0-9]{0,2}$";
    this.alphabetRegex = /^[a-zA-Z ]*$/;

    this.reg_Form = this.fb.group({
      'college_name': ['', [Validators.required, Validators.maxLength(255)]],
      'course': ['', [Validators.required, Validators.maxLength(30)]],
      'branch': ['', [Validators.required, Validators.maxLength(30)]],
      'year': ['', [Validators.required, Validators.maxLength(30)]],
      'section': ['', [Validators.required, Validators.maxLength(30)]],
      'university_reg_number': ['', [Validators.required, Validators.maxLength(255)]],
      'first_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'last_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'gender': ['', [Validators.required, Validators]],
      'dob': ['', [Validators.required, Validators]],
      'aadhaar_number': ['', [Validators.required, Validators.maxLength(12), Validators.pattern(this.arRegex)]],
      'email_id': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.emailRegex)]],
      'fathers_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'mothers_name': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'mobile_number': ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.mobileex)]],
      'alternate_mobile_number': ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.mobileex)]],
      'address': ['', [Validators.required, Validators.maxLength(255)]],
      'backlogs': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.backlogRegex)]],
      'x_board': ['', [Validators.required, Validators.maxLength(255)]],
      'x_percentage': ['', [Validators.required, Validators.maxLength(255)]],
      'x_year_of_passing': ['', [Validators.required, Validators.maxLength(255)]],
      'xII_board': ['', [Validators.required, Validators.maxLength(255)]],
      'xII_percentage': ['', [Validators.required, Validators.maxLength(255)]],
      'xII_year_of_passing': ['', [Validators.required, Validators.maxLength(255)]],
      'btech_board': ['', [Validators.required, Validators.maxLength(255)]],
      'btech_percentage': ['', [Validators.required, Validators.maxLength(255)]],
      'btech_year_of_passing': ['', [Validators.required, Validators.maxLength(255)]],
      'eamcet_rank': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.rankRegex)]],
      'father_proffesion': ['', [Validators.required, Validators.maxLength(255)]],
      'nationalitiy': ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.alphabetRegex)]],
      'language_known': ['', [Validators.required, Validators.maxLength(255)]],
    });
  }
  // getStudentsdata() {
  //   this._apiService.studentsdatabyid()
  //     .subscribe(data => {
  //       if (data.success) {
  //         this.details = data.data;
  //         console.log(this.details, 'test1');
  //       }
  //     });
  // }

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
  checkdatabyid(eid) {
    console.log(eid)
    this.loading1 = true;
    this.loading = true;
    this.editform = false;
    this.searchdata();
    this.getcertificate_details();
  }

  closecheckdata() {
    this.loading1 = false;
    this.loading = true;
    this.searchdata();
  }
  approvedatabyid() {
    this.loading1 = false;
    this.loading = false;
    this.searchdata();
  }

  approvestudata(form) {
    console.log(this.eid, 'status data');
    this._apiService.setstatus(this.id, this.eid)
      .subscribe(data => {
        console.log(data);
        this.toastr.success('successfully sent to Placement Officier', 'Success!!');
        form.resetForm();
        this.closecheckdata();
      });

  }
  getStudentsdata
  switchchange(event) {
    console.log(event, 'changed');
  }

  getyearsection() {
    const body = {
      'college': this.college,
      'branch': this.dept
    }
    this._apiService.getyearsec(body)
      .subscribe(data => {
        console.log(data, 'college,course,branch');
      });
  }


  getCollege() {
    this._apiService.getCollege().subscribe(data => {
      this.collegedata = data.data;
      // console.log(this.collegedata, 'college data');
      // console.log(this.college, this.dept, 'college,dept');

      // front end dynamic printing
      for (var i = 0; i < this.collegedata.length; i++) {
        if (this.college == this.collegedata[i].college) {
          this.clg_fulname = this.collegedata[i].full_name;
          this.clg_id = this.collegedata[i].id;
          // console.log(this.clg_fulname, this.clg_id, 'college fullname with id');
        }
      }
      // console.log(this.clg_fulname, this.clg_id, 'college fullname with id');
    });
  }

  getCourse() {
    this._apiService.getCourse().subscribe(data => {
      console.log(data, 'course data');
      console.log(this.collegeid.id);
      this.clg_data = [];
      this.coursedata = data.data;
      for (var j = 0; j < this.coursedata.length; j++) {
        if (this.collegeid.id == this.coursedata[j].cid) {
          this.clg_data.push(this.coursedata[j]);
        }
      }
      console.log(this.clg_data, 'testing for data');
    })
  }

  getBranchdata() {
    this._apiService.getBranchdata().subscribe(data => {
      this.branchdata = data.data;
      console.log(this.branchdata, 'branch data');
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

  callcollegeid() {
    this._apiService.callcollegeid().subscribe(data => {
      console.log(data, 'colleg id data');
      this.collegeid = data.data[0];
      console.log(this.collegeid, 'testing for college id');
    })
  }

  callcollege(value) {
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
    console.log(value.target.value);
    this.addnew = value.target.value;
    this.course = value.target.value;
    this.newbranch = [];
    this._apiService.getbranchid(this.course).subscribe(data => {
      console.log(data, 'testing for data branch id');
      this.branchid = data.data[0];
      this.newyeardata = [];
      console.log(this.branchid, 'banch id');
      console.log(this.branchid.id, 'branch testing');
      this.branchno = this.branchid.id;
      console.log(this.newbranch, 'tedsting branch new data');
      for (var j = 0; j < this.yeardata.length; j++) {
        if (this.branchid.id == this.yeardata[j].bid) {
          this.newyeardata.push(this.yeardata[j]);
        }
      }
      this.newyeardata.splice(0, 3);
    })
  }
  callyear(value) {
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
    this.section = value.target.value; value
    console.log(this.section, 'section id data');
  }

  searchdata() {
    const value = {

      college_name: this.clg_id,
      branch: this.branchno,
      course: this.studentForm.controls['course'].value,
      year: this.studentForm.controls['year'].value,
      section: this.studentForm.controls['section'].value

    }
    console.log(value, 'searchdata');
    this._apiService.searchdata(value).subscribe(data => {
      this.details = data.data;
      // this.toastr.success('successfully updated','Success!!');
      console.log(this.details, 'testing for the search data');
    })
  }

  technical: any;
  nontechnical: any;
  dp: any;
  resumefile: any;
  res: any;
  getcertificate_details() {
    console.log(this.eid);
    this._apiService.getcertificate(this.eid.university_reg_number).subscribe(data => {
      // if (data.data.technical.length > 0) {
      //   this.technical = data.data.technical;
      // }
      this.technical = [];
      this.nontechnical = [];
      if (data.data.technical.length >= 0) {
        this.technical = data.data.technical;
      }
      if (data.data.nontechnical.length >= 0) {
        this.nontechnical = data.data.nontechnical;
      }
      if (data.data.dp) {
        this.dp = data.data.dp;
      }
      if (data.data.dp == undefined) {
        this.dp = false;
      }
      if (data.data.resume) {
        this.resumefile = data.data.resume;
        this.res = data.data.resume.certificate_name;
      }
      if (data.data.resume == undefined) {
        this.res = '';
      }
      console.log(this.dp, this.resumefile, 'files');

    });
  }

  pdf_url: any;
  certificate_show(value, type) {
    if (type == 'technical') {
      this.pdf_url = this.basicurl + '/' + value.certificate_name;
    }
    if (type == 'resume') {
      this.pdf_url = this.basicurl + '/' + value.certificate_name;
    }
    if (type == 'nontechnical') {
      this.pdf_url = this.basicurl + '/' + value.certificate_name;
    }
    console.log(value, this.pdf_url);

    return this.pdf_url;
  }

  photoURL(id) {
    return this.basicurl + '/' + id;
  }

  editform: boolean;
  openeditform(id) {
    this.editform = true;
    this.loading1 = false;
    this.reg_Form.patchValue(id);
    this.reg_Form.patchValue({ dob: { formatted: id['dob'] } });
    console.log(id, 'data');
  }

  closeeditform() {
    this.editform = false;
  }

  updatebyid() {
    const value = {

      college_name: this.reg_Form.controls['college_name'].value,
      branch: this.reg_Form.controls['branch'].value,
      course: this.reg_Form.controls['course'].value,
      year: this.reg_Form.controls['year'].value,
      section: this.reg_Form.controls['section'].value,
      university_reg_number: this.reg_Form.controls['university_reg_number'].value,
      first_name: this.reg_Form.controls['first_name'].value,
      last_name: this.reg_Form.controls['last_name'].value,
      gender: this.reg_Form.controls['gender'].value,
      dob: this.reg_Form.controls['dob'].value.formatted,
      aadhaar_number: this.reg_Form.controls['aadhaar_number'].value,
      email_id: this.reg_Form.controls['email_id'].value,
      fathers_name: this.reg_Form.controls['fathers_name'].value,
      mothers_name: this.reg_Form.controls['mothers_name'].value,
      mobile_number: this.reg_Form.controls['mobile_number'].value,
      alternate_mobile_number: this.reg_Form.controls['alternate_mobile_number'].value,
      address: this.reg_Form.controls['address'].value,
      backlogs: this.reg_Form.controls['backlogs'].value,
      x_board: this.reg_Form.controls['x_board'].value,
      x_percentage: this.reg_Form.controls['x_percentage'].value,
      x_year_of_passing: this.reg_Form.controls['x_year_of_passing'].value,
      xII_board: this.reg_Form.controls['xII_board'].value,
      xII_percentage: this.reg_Form.controls['xII_percentage'].value,
      xII_year_of_passing: this.reg_Form.controls['xII_year_of_passing'].value,
      btech_board: this.reg_Form.controls['btech_board'].value,
      btech_percentage: this.reg_Form.controls['btech_percentage'].value,
      btech_year_of_passing: this.reg_Form.controls['btech_year_of_passing'].value,
      eamcet_rank: this.reg_Form.controls['eamcet_rank'].value,
      father_proffesion: this.reg_Form.controls['father_proffesion'].value,
      nationalitiy: this.reg_Form.controls['nationalitiy'].value,
      language_known: this.reg_Form.controls['language_known'].value
    }

    console.log(value, 'test1');

    this._apiService.updationreg(value)
      .subscribe(data => {
        this.toastr.success('updated successfully', 'Success!!');
        this.closeeditform();
      });
  }

  deletepic(pic) {
    console.log(pic, 'picture');
    const body = {};
    body['pic'] = pic.certificate_name;
    body['reg_no'] = pic.reg_no;
    body['type'] = pic.type;
    body['id'] = pic.id;
    this._apiService.deletefile(body).subscribe(data => {
      this.toastr.success('Deleted successfully', 'Success!!');
      this.checkdatabyid(pic.id);
    });
  }
}
