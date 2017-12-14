import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef, ViewContainerRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControlName, FormArray, FormArrayName } from '@angular/forms';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from '../common/generic-validator';
import { Observable } from 'rxjs/Observable';
import { log } from 'util';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {
  check_all: boolean = false;
  check_all_attendance: boolean;
  viewroundprogresss: boolean;
  emailcheck: boolean;
  sub_button: any;
  submit: any = [];
  sub_round: any = [];
  round_submit: any;
  attendance: any = [];
  present_count = 0;
  assigned: any;
  assigned_next: any;
  assigned_splice: any;
  id: any = {};
  branches: any;
  college: any;
  date1: any;
  myForm: FormGroup;
  myeditForm: FormGroup;
  emailform: FormGroup;

  rowdata: any = {};
  rowdata1: any = [];
  rowdata12: any = [];
  rowdata13: any = [];
  drivename: string;
  clgname: any;
  defbranch = [];
  defbrid = [];
  defitem = [];
  defclgid = [];
  defclgname = [];
  defbranchid: any;
  def_branch = [];
  quelist = [];
  myOptionsbr: any = [];
  myoptionsdefault = [];
  dropdownSettingsdefbr = {};
  displayMessage: { [key: string]: string } = {};

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('editcompaniesdata') modal: any;
  @ViewChild('defaultloading') modalloading: any;
  @ViewChild('crosscheck') modal1: any;


  public filterQuery = "";
  public rowsOnPage = 6;
  public sortBy = "";
  public sortOrder = "asc";
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  private myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 }
  };

  private myDatePickerOptions2: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 }
  };

  ChangeDate(event) {
    const dates = event.formatted;
    console.log(event, 'date test', dates);
    const fdate = new Date(dates).setDate(new Date(dates).getDate() - 1)
    console.log(event, 'date test2', dates, fdate);

    this.myDatePickerOptions2 = {
      dateFormat: 'yyyy-mm-dd',
      editableDateField: false,
      openSelectorOnInputClick: true,
      disableUntil: { year: new Date(fdate).getFullYear(), month: new Date(fdate).getMonth() + 1, day: new Date(fdate).getDate() }
    };

  }

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.validationMessages = {
      company: {
        required: 'company Name is required',
        maxLength: 'company Name should be less than 255 characters'
      },
      branches: {
        required: 'branch Name is required',
        maxLength: 'branch Name should be less than 255 characters'
      },
      college: {
        required: 'College Name is required',
        maxLength: 'College Name should be less than 255 characters'
      },
      location: {
        required: 'location is required',
        maxLength: 'location should be less than 255 characters'
      },
      c_date: {
        required: 'Drive Date is required',
        maxLength: 'Drive Date should be less than 255 characters'
      },
      gender: {
        required: 'Gender is required',
      },
      percentage: {
        required: 'percentage is required',
        maxLength: 'percentage should be less than 255 characters'
      },
      backlogs: {
        required: 'Backlogs is required',
        maxLength: 'Backlogs should be less than 255 characters',
        pattern: 'You entered number is exceeding 2 digits / minus value'
      },
      package: {
        required: 'package is required',
        maxLength: 'package should be less than 255 characters',
        pattern: 'You entered number is exceeding .2 digits / minus value'
      },
      round: {
        required: 'Round is required',
        maxLength: 'Round should be less than 255 characters'
      },
      drive_name: {
        required: 'Drive Name is required',
        maxLength: 'Drive Name should be less than 255 characters'
      },
      drive_location: {
        required: 'Drive Location is required',
        maxLength: 'Drive Location should be less than 255 characters'
      },
      drive_descripition: {
        required: 'Drive Description is required',
        maxLength: 'Drive Description should be less than 255 characters'
      },
      round_descripition: {
        required: 'Round Description is required',
        maxLength: 'Round Description should be less than 255 characters'
      },
      defbranches: {
        required: 'College/Branch is required',
      }

    };

    this.myForm = this.fb.group({
      rounds: this.fb.array([this.roundsData()])
    });

    this.myeditForm = this.fb.group({
      rounds: this.fb.array([this.roundsData2()])
    });

  }

  get rounds(): FormArray {
    return <FormArray>this.myForm.get('rounds');
  }



  d = new Date();
  public model: Object = { date: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: this.d.getDate() } };
  backlogRegex;
  packageRegex;
  ngOnInit() {

    this._apiService.page = "companies";
    console.log(this.model, this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate(), 'date');
    this.date1 = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate();
    this.getregistrationaddcom();
    this.getdataofstf();
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.backlogRegex = "^[0-9]{0,2}$";
    // this.packageRegex = "^[0-9]{0,5}([\.]?[0-9]{3})*$";
    // this.mobileex = "[7-9]{1}[0-9]{9}";
    this.myForm = this.fb.group({
      company: ['', [Validators.required, Validators.maxLength(255)]],
      defbranches: [[], [Validators.required, Validators.maxLength(255)]],
      location: ['', [Validators.required, Validators.maxLength(255)]],
      package: ['', [Validators.required, Validators.maxLength(255)]],
      gender: ['', [Validators.required]],
      c_date: [{}, [Validators.required]],
      backlogs: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.backlogRegex)]],
      percentage: ['', [Validators.required]],
      drive_location: ['', [Validators.required, Validators.maxLength(255)]],
      drive_name: ['', [Validators.required, Validators.maxLength(255)]],
      drive_descripition: ['', [Validators.required, Validators.maxLength(255)]],
      rounds: this.fb.array([this.roundsData()])
    });
    this.myeditForm = this.fb.group({
      company: ['', [Validators.required, Validators.maxLength(255)]],
      location: ['', [Validators.required, Validators.maxLength(255)]],
      defcollege: [[], [Validators.required, Validators.maxLength(255)]],
      package: ['', [Validators.required, Validators.maxLength(255)]],
      c_date: ['', [Validators.required, Validators.maxLength(255)]],
      gender: ['', [Validators.required]],
      drive_location: ['', [Validators.required, Validators.maxLength(255)]],
      backlogs: ['', [Validators.required, Validators.maxLength(255)]],
      percentage: ['', [Validators.required, Validators.maxLength(255)]],
      drive_name: ['', [Validators.required, Validators.maxLength(255)]],
      drive_descripition: ['', [Validators.required, Validators.maxLength(255)]],
      rounds: this.fb.array([this.roundsData2()])
    });

    this.emailform = this.fb.group({
      'toemail': ['', [Validators.required]],
      'fromemail': ['', [Validators.required]],
      'ccmail': ['', [Validators.required]],
      'subject': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });


    this.dropdownSettingsdefbr = {
      singleSelection: false,
      text: "Select College/Branch",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 5,
    };

    this.drivename = this.myForm.controls['company'].value;
    console.log(this.drivename, 'drive name');
    this.getdefaultbybranchid();

  }

  ngAfterViewInit(): void {
    if (this.myForm) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.myForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.myForm);
      });
    }
    if (this.myeditForm) {
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.myeditForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.myeditForm);
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


  getdefaultbybranchid() {
    this._apiService.getdefaultdatabybranches().subscribe(data => {
      console.log(data, 'brchs tetttt');
      this.myoptionsdefault = data.data.data;
    });
  }

  jid;
  changerounddates(event, id) {
    const dates = event.formatted;
    console.log(this.myForm);
    console.log(event, id + 1, 'date test', dates);
    this.jid = id + 1;
    const fdate = new Date(dates).setDate(new Date(dates).getDate() - 1)
    console.log(event, 'date test2', dates, fdate);
    // this.myForm.controls['rounds']['controls'][id+1]['controls']['r_date']['value'].myDatePickerOptions2.disableUntil.year=new Date(fdate).getFullYear()
    // this.myForm.controls['rounds']['controls'][id+1]['controls']['r_date']['value'].myDatePickerOptions2.disableUntil.month=new Date(fdate).getMonth() +1
    // this.myForm.controls['rounds']['controls'][id+1]['controls']['r_date']['value'].myDatePickerOptions2.disableUntil.day=new Date(fdate).getDate() 

    // this.myForm.controls['rounds']['controls'][id + 1].patchValue({
    //   myDatePickerOptions2: {
    //     year: new Date(fdate).getFullYear(),
    //     month: new Date(fdate).getMonth() + 1,
    //     day: new Date(fdate).getDate()
    //   }
    // })


    console.log(
      this.myForm.controls,
      'myform controls test',
      this.myForm.controls['rounds']['controls'][id + 1]['controls'],
      'id',
      id
    );

  }


  branchsort = [];
  finalbranchsort = [];
  getregistrationaddcom() {
    this._apiService.getregistrationaddcom().subscribe(ques => {
      console.log(ques, 'test');
      this.quelist = ques.data;
      console.log(this.quelist, 'companies list');


      // for (var j = 0; j < this.quelist.length; j++) {
      //   this.branchsort[j].push(this.quelist[j].branches.split(",") );
      //   var fd = 0;
      //   var gfd = 0;
      //   for (var g = 0; g < this.branchsort.length; g++) {
      //     if (this.quelist[j].branches == this.branchsort[g]) {
      //       fd = 1
      //       break;
      //     }
      //   }
      //   if (fd == 0) {
      //     this.finalbranchsort.push(this.quelist[j].branches);
      //   }
      // }

      console.log(this.finalbranchsort, 'final branches');
    });
  }



  addRounds(): void {
    (<FormArray>this.myForm.controls['rounds']).push(this.roundsData());
    console.log(this.myForm.value.rounds, 'rounds test');

  }

  remove_round(i: number) {
    console.log('in remove method' + i + (<FormArray>this.myForm.controls['rounds']).length);
    const control = <FormArray>this.myForm.controls['rounds'];
    control.removeAt(i);

    console.log('after remove method');
    console.log('in remove method' + i + (<FormArray>this.myForm.controls['rounds']).length);
  }

  roundsData(): FormGroup {
    return this.fb.group({
      round: '1',
      round_descripition: '',
      r_date: [{}],
      myDatePickerOptions2: {
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        openSelectorOnInputClick: true,
        disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 }
      }
    });
  }

  addRounds2(r, des, dt): void {
    (<FormArray>this.myeditForm.controls['rounds']).push(this.roundsData2());
    console.log(this.myeditForm.value.rounds, 'rounds test');
    var jj = this.myeditForm.controls['rounds']['controls'].length;
    this.myeditForm.controls['rounds']['controls'][parseInt(jj) - 1].patchValue({
      round: r,
      round_descripition: des,
      r_date: { formatted: dt },
    })
  }

  addRounds21(r, des): void {
    (<FormArray>this.myeditForm.controls['rounds']).push(this.roundsData2());
    console.log(this.myeditForm.value.rounds, 'rounds test');

  }

  remove_round2(i: number) {
    console.log('in remove method' + i + (<FormArray>this.myeditForm.controls['rounds']).length);
    const control = <FormArray>this.myeditForm.controls['rounds'];
    control.removeAt(i);
    console.log('after remove method');
    console.log('in remove method' + i + (<FormArray>this.myeditForm.controls['rounds']).length);
  }

  roundsData2(): FormGroup {
    return this.fb.group({
      round: '',
      round_descripition: '',
      r_date: [{}],
    });
  }

  elgiblecount;


  save() {
    this.defbranch = [];
    this.defbrid = [];
    this.defitem = [];
    this.def_branch = [];

    this.defbranch = this.myForm.controls['defbranches'].value;
    console.log(this.defbranch, 'default branch');

    console.log(this.defbranch, 'array test sort');

    var colids = this.defbranch[0].col_id;
    var colnamess = this.defbranch[0].college;
    var brids = this.defbranch[0].br_id;
    var brnamess = this.defbranch[0].branch;

    this.defclgid.push(colids);
    this.defclgname.push(colnamess);
    this.defbrid.push(brids);
    this.def_branch.push(brnamess);

    for (var kj = 1; kj < this.defbranch.length; kj++) {
      var fd = 0;
      var gfd = 0;
      for (var gh = 0; gh < this.defclgid.length; gh++) {
        if (this.defbranch[kj].col_id == this.defclgid[gh]) {
          fd = 1
          break;
        }
      }

      if (fd == 0) {
        this.defclgid.push(this.defbranch[kj].col_id);
        this.defclgname.push(this.defbranch[kj].college);
      }

      for (var gh = 0; gh < this.defbrid.length; gh++) {
        if (this.defbranch[kj].br_id == this.defbrid[gh]) {
          gfd = 1
          break;
        }
      }

      if (gfd == 0) {
        this.defbrid.push(this.defbranch[kj].br_id);
        this.def_branch.push(this.defbranch[kj].branch);
      }

    }

    for (var i = 0; i < this.myForm.controls['rounds']['controls'].length; i++) {
      this.myForm.controls['rounds']['controls'][i].patchValue({
        round: 'R' + (i + 1)
      })
    }

    // confirm("Are you sure you want to add " + this.myForm.controls['company'].value + " Details.");


    const value = {
      company: this.myForm.controls['company'].value,
      college: this.defclgname.toString(),
      clgid: this.defclgid.toString(),
      location: this.myForm.controls['location'].value,
      gender: this.myForm.controls['gender'].value,
      drive_location: this.myForm.controls['drive_location'].value,
      package: this.myForm.controls['package'].value,
      c_date: this.myForm.controls['c_date'].value,
      branches: this.def_branch.toString(),
      branchid: this.defbrid.toString(),
      item: this.defitem.toString(),
      drive_name: this.myForm.controls['drive_name'].value,
      drive_descripition: this.myForm.controls['drive_descripition'].value,
      backlogs: this.myForm.controls['backlogs'].value,
      percentage: this.myForm.controls['percentage'].value,
      rounds: this.myForm.controls['rounds'].value
    }
    console.log(value, 'companies');
    this._apiService.registrationaddcom(value).subscribe(ques => {
      this.toastr.success('Submitted Successfully ', 'Success!!')
      this.myForm.reset();
      this.closeaddform();
      this.getregistrationaddcom()
    });

  }
  company_name;
  company_package;
  drivedate;
  total_count;
  c_location;
  details = [];
  loading: boolean;
  loading1: boolean;
  opendrivedetails: boolean;
  openshorteddata: boolean;
  roundsdata: boolean;
  presentlist = [];
  presenties_reg_no = [];
  exactdata = [];
  company_id;
  data: boolean;

  emaildata: any = {};
  openshortlist(a) {
    this.emaildata = a;
    this.total_count = '';
    this.present_count = 0;
    this.assigned = [];
    this.assigned_splice = [];
    this.details = [];
    this.loading = true;
    this.loading1 = false;
    this.openshorteddata = true;
    this.opendrivedetails = false;
    this.viewroundprogresss = false;
    this.roundsdata = false;

    this.company_name = a.company;
    this.company_dispname = a.drive_dispname;
    this.company_package = a.package;
    this.company_id = a.fid;
    this.c_location = a.location;
    this.drivedate = a.c_date;

    console.log(a, 'short list');
    this._apiService.getshortedlist(a).subscribe(data => {
      this.details = data.data.data;
      this.exactdata = data.data.data;
      this.assigned = data.data.assigned;
      if (this.assigned != null) {
        this.assigned_splice = this.assigned[0].reg_no.split(",");
        this.data = true;
        console.log(this.assigned_splice);
        for (var i = 0; i < this.details.length; i++) {
          for (var j = 0; j < this.assigned_splice.length; j++) {
            if (this.details[i].university_reg_number == this.assigned_splice[j]) {
              this.details[i].reg_no = '1';
              this.details[i].disabled = true;
              break;
            }
            // this.details[i].disabled = true;
            else if (this.details[i].reg_no != '1') {
              this.details[i].reg_no = '0';
            }
            this.details[i].disabled = true;
          }
        }
      }
      else {
        for (var i = 0; i < this.details.length; i++) {
          this.details[i].reg_no = '0';
        }
      }

      this.attendance = this.assigned_splice;
      this.total_count = this.details.length;
      console.log(this.details, 'companies shorting list');
    });

    const body = {};
    body['company_dispname'] = a.fid;
    this._apiService.getpresentieslist(body).subscribe(data => {
      this.presentlist = data.data.data
      if (this.presentlist.length != 0) {
        this.presenties_reg_no = this.presentlist[0].reg_no.split(",");
      }
      this.present_count = this.presenties_reg_no.length;
      console.log(this.presentlist, this.presenties_reg_no, 'attendance');
    });
  }

  closeshortlist() {
    this.openshorteddata = false;
  }

  roundsprogress = [];
  roundsprogress1 = [];
  finalrounddata = [];

  openroundsprogress(td) {
    this.viewroundprogresss = true;
    this.sendemailbox = false;
    this.tableopen = false;
    this.loading = false;
    this.loading1 = false;
    this.openshorteddata = false;
    this.opendrivedetails = false;
    this.roundsdata = false;
    this.company_name = td.company;
    this.company_dispname = td.drive_dispname;
    this.company_package = td.package;
    this.drivedate = td.c_date;
    this.c_location = td.location;
    console.log(td, 'selected list');
    this._apiService.getshortedlist(td).subscribe(data => {
      this.details = data.data.data;
      this.elgiblecount = this.details.length;
    });

    this.roundsprogress = [];
    this.roundsprogress1 = [];

    this._apiService.getroundprogress(td).subscribe(data => {
      this.roundsprogress1 = data.data.data;
      this.finalrounddata = data.data.finalrounddata;
      for (let i = 0; i < this.roundsprogress1.length - 1; i++) {
        this.roundsprogress.push(this.roundsprogress1[i]);
      }
      console.log(this.roundsprogress, 'companies shorting list', this.roundsprogress1);
    });
  }

  roundsdatadis = '';
  dispalybyround(dataa) {
    this.finalrounddata = [];
    console.log(dataa);

    if (dataa.rounds == 'R1') {
      this.roundsdatadis = 'Attended';
    } else if (dataa.rounds == null) {
      this.roundsdatadis = this.roundsprogress[this.roundsprogress.length - 1].rounds + '-' + this.roundsprogress[this.roundsprogress.length - 1].descripition;
    } else {
      this.roundsdatadis = this.roundsprogress[this.roundsprogress.indexOf(dataa) - 1].rounds + '-' + this.roundsprogress[this.roundsprogress.indexOf(dataa) - 1].descripition;
    }


    const body = {};
    body['reg_no'] = dataa.reg_no;
    this._apiService.getStddatabyregno(body).subscribe(data => {
      console.log(data);
      this.finalrounddata = data.data.data;
    });
  }

  closeroundproglist() {
    this.viewroundprogresss = false;
  }

  openselectedstd(a) {
    this.assigned = '';
    this.openshorteddata = true;
    this.opendrivedetails = false;
    this.viewroundprogresss = false;
    this.roundsdata = false;
    this.loading = false;
    this.loading1 = true;
    this.company_name = a.company;
    this.company_dispname = a.drive_dispname;
    this.company_package = a.package;
    this.drivedate = a.c_date;
    this.c_location = a.location;
    console.log(a, 'selected list');
    this._apiService.getselectedstd(a).subscribe(data => {
      this.details = data.data.data;
      this.total_count = this.details.length;
      console.log(this.details, this.total_count, 'companies shorting list');
    });
  }

  fid: any;
  loading3: boolean = false;
  branchassign = [];
  collegearr = [];
  brancharr = [];
  rounddata = [];

  editcompanies(a) {
    this.branchassign = [];
    this.collegearr = [];
    this.loading3 = true;
    this.loading2 = false;
    this.opendrivedetails = false;
    this.viewroundprogresss = false;
    this.openshorteddata = false;
    this.roundsdata = false;
    console.log(a, '123');
    this.fid = a.fid;
    this.branchassign = a.branchid.split(",");

    for (var i = 0; i < this.branchassign.length; i++) {
      var cs = this.branchassign[i];
      var bs = this.myoptionsdefault.filter(function (params) {
        // console.log(params, cs, 'params');
        return params.id == cs;
      });
      this.collegearr.push(bs[0]);
    }

    console.log(this.collegearr, 'actualid');

    const body = {};
    body['fid'] = this.fid;
    this._apiService.getroundbyid(body).subscribe(data => {
      console.log(data);
      this.rounddata = data.data.data;
      this.myeditForm.controls['rounds']['controls'] = [];
      console.log(this.myeditForm.value, 'length rounds empty');

      // this.myeditForm.controls['rounds']['controls'][0].patchValue({
      //   round: this.rounddata[0].rounds,
      //   round_descripition: this.rounddata[0].descripition
      // })
      for (var jj = 0; jj < this.rounddata.length; jj++) {
        this.addRounds2(this.rounddata[jj].rounds, this.rounddata[jj].descripition, this.rounddata[jj].round_date)

      }
      console.log(this.myeditForm, 'cotrol rounds');

    });

    this.myeditForm.patchValue(a);
    this.myeditForm.patchValue({
      c_date: { formatted: a.c_date },
      drive_name: a.drive_dispname,
      drive_decripition: a.drive_decripition,
    });
    console.log(this.myeditForm.value, 'test');
  }

  editdefcollege = [];
  editdefbrid = [];
  editdefitem = []
  editdef_branch = [];
  editdefclgid = []
  editdefclgname = []
  def_item = [];

  edit(a) {
    console.log(a.value, 'edited', this.myeditForm.value);
    // alert("You have made some changes. Do you Want to save?");
    this.editdefcollege = [];
    this.editdefbrid = [];
    this.editdefitem = [];
    this.editdef_branch = [];
    this.editdefclgname = [];
    this.def_item = [];

    this.editdefcollege = this.myeditForm.controls['defcollege'].value;
    console.log(this.editdefcollege, this.myeditForm.controls['defcollege'].value, 'default branch');

    console.log(this.editdefcollege, 'array test sort');

    var ecolids = this.editdefcollege[0].col_id;
    var ecolnamess = this.editdefcollege[0].college;
    var ebrids = this.editdefcollege[0].br_id;
    var ebrnamess = this.editdefcollege[0].branch;

    this.editdefclgid.push(ecolids);
    this.editdefclgname.push(ecolnamess);
    this.editdefbrid.push(ebrids);
    this.editdef_branch.push(ebrnamess);

    for (var ekj = 0; ekj < this.editdefcollege.length; ekj++) {
      var efd = 0;
      var egfd = 0;
      for (var egh = 0; egh < this.editdefclgid.length; egh++) {
        if (this.editdefcollege[ekj].col_id == this.editdefclgid[egh]) {
          efd = 1
          break;
        }
      }


      if (efd == 0) {
        this.editdefclgid.push(this.editdefcollege[ekj].col_id);
        this.editdefclgname.push(this.editdefcollege[ekj].college);
      }

      for (var egh = 0; egh < this.editdefbrid.length; egh++) {
        if (this.editdefcollege[ekj].br_id == this.editdefbrid[egh]) {
          egfd = 1
          break;
        }
      }

      if (egfd == 0) {
        this.editdefbrid.push(this.editdefcollege[ekj].br_id);
        this.editdef_branch.push(this.editdefcollege[ekj].branch);
        this.def_item.push(this.editdefcollege[ekj].itemName)
      }

    }

    for (var i = 0; i < this.myeditForm.controls['rounds']['controls'].length; i++) {
      this.myeditForm.controls['rounds']['controls'][i].patchValue({
        round: 'R' + (i + 1)
      })
    }


    const body = {
      company: this.myeditForm.controls['company'].value,
      college: this.editdefclgname.toString(),
      clgid: this.editdefclgid.toString(),
      location: this.myeditForm.controls['location'].value,
      gender: this.myeditForm.controls['gender'].value,
      drive_location: this.myeditForm.controls['drive_location'].value,
      package: this.myeditForm.controls['package'].value,
      c_date: this.myeditForm.controls['c_date'].value,
      branches: this.editdef_branch.toString(),
      item: this.def_item.toString(),
      branchid: this.editdefbrid.toString(),
      drive_name: this.myeditForm.controls['drive_name'].value,
      drive_descripition: this.myeditForm.controls['drive_descripition'].value,
      backlogs: this.myeditForm.controls['backlogs'].value,
      percentage: this.myeditForm.controls['percentage'].value,
      fid: this.fid,
      rounds: this.myeditForm.controls['rounds'].value

    }

    console.log(body, 'companies');
    this._apiService.updateregistrationaddcom(body).subscribe(ques => {
      this.toastr.success('updated Successfully ', 'Success!!')
      this.myeditForm.reset();
      this.closeeditform();
      this.getregistrationaddcom()
    });
  }

  loading2: boolean = false;
  closeaddform() {
    this.myForm.reset();
    this.loading2 = false;
    this.opendrivedetails = false;
  }

  openaddform() {
    this.loading2 = true;
    this.loading3 = false;
    this.opendrivedetails = false;
    this.openshorteddata = false;
    this.roundsdata = false;
  }

  closeeditform() {
    this.loading3 = false;
  }

  onItemSelect(item: any) {
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
  onItemSelect1(item: any) {
    console.log(item);
  }
  OnItemDeSelect1(item: any) {
    console.log(item);
  }
  onSelectAll1(items: any) {
    console.log(items);
  }
  onDeSelectAll1(items: any) {
    console.log(items);
  }
  event
  drivedetails = [];
  company_dispname: any;
  companydata: any = {};
  openDrivedetails1(id) {
    console.log(id);
    this.companydata = id;
    this.opendrivedetails = true;
    this.viewroundprogresss = false;
    this.loading3 = false;
    this.roundsdata = false;
    this.openshorteddata = false;
    this.company_dispname = id.drive_dispname;
    this.company_name = id.company;
    this.company_id = id.fid;
    this.company_package = id.package;
    this.drivedate = id.c_date;
    const body = {};
    body['drive_dispname'] = id.fid;
    this._apiService.getDrivedetails(body).subscribe(data => {
      console.log(data, 'drive data');
      this.drivedetails = data.data.data;
      console.log(this.drivedetails, 'drive data');
    });
  }

  closeDrivedetails() {
    this.opendrivedetails = false;
  }

  rounddetails = [];

  openroundslist(b) {
    this.roundlist = [];
    this.total_count = '';
    this.present_count = 0;
    this.roundsdata = true;
    this.opendrivedetails = false;
    this.viewroundprogresss = false;
    this.openshorteddata = false;
    this.loading3 = false;
    console.log(b, 'testdata');
    this.company_dispname = b.drive_dispname;
    this.company_name = b.company;
    this.company_package = b.package;
    this.drivedate = b.c_date;
    this.company_id = b.fid;
    console.log(b, 'short list');
    this._apiService.getshortedlist(b).subscribe(data => {
      this.details = data.data.data;
      this.elgiblecount = this.details.length;
    });

    const body = {};
    body['drive_dispname'] = b.fid;
    this._apiService.getDrivedetails(body).subscribe(data => {
      this.rounddetails = data.data.data;
      // this.rounddetails.splice(0, 0, {
      //   cr_id: b.cr_id,
      //   company_id: b.fid,
      //   rounds: 'R',
      //   descripition: 'Attendees',
      // })
      console.log(this.rounddetails, 'rounds data');
    });


  }



  closeroundslist() {
    this.roundsdata = false;
  }

  roundscheck = '';
  round_descripition = '';
  round_data = '';
  roundlist = [];
  send_r = '';
  send_r1 = '';
  callrounds(event, id) {
    this.round_submit = [];
    this.assigned_splice = [];
    this.present_count = 0;
    console.log(event.target.value, id, 'test123');
    this.roundscheck = event.target.value;
    console.log(this.rounddetails, '123');
    for (var i = 0; i < this.rounddetails.length; i++) {
      if (this.roundscheck == this.rounddetails[i].rounds) {
        this.round_data = this.rounddetails[i].rounds;
        this.round_descripition = this.rounddetails[i].descripition;
        this.round_submit = this.rounddetails[i];
      }
    }

    const body = {};
    body['company_id'] = id;
    body['rounds'] = this.roundscheck;
    body['drive_decripition'] = this.round_descripition;
    console.log(id, this.roundscheck, this.round_descripition);
    this._apiService.getacrdtoround(body).subscribe(data => {
      this.roundlist = data.data.data;
      this.sub_button = data.data.sub_button;
      this.assigned_next = data.data.assigned;


      this.send_r = data.data.send_r;
      if (this.assigned_next != []) {
        this.assigned_splice = this.assigned_next[0].reg_no.split(",");
        // this.send_r = data.data.assigned[0].rounds

        this.present_count = this.assigned_splice.length;
        for (var i = 0; i < this.roundlist.length; i++) {
          for (var j = 0; j < this.assigned_splice.length; j++) {
            if (this.roundlist[i].university_reg_number == this.assigned_splice[j]) {
              console.log(this.roundlist[i].university_reg_number, this.assigned_splice[j], 'data');
              this.roundlist[i].check_box = true;
              this.roundlist[i].disabled = true;
              break;
            }
            // if (this.roundlist[i].check_box = 'false') {
            //   this.roundlist[i].check_box = false;
            this.roundlist[i].disabled = true;
            // }
          }
        }

        if (this.send_r == 'Final Round') {
          this.send_r1 = 'Final Round';
        }
        else {
          this.send_r1 = 'Next Round';
        }
      } else if (this.assigned_next == '') {
        if (this.send_r == 'Final Round') {
          this.send_r1 = 'Final Round';
        }
        else {
          this.send_r1 = 'Next Round';
        }
        for (var i = 0; i < this.roundlist.length; i++) {
          this.roundlist[i].check_box = false;
        }
      }
      console.log(this.roundlist.length, 'rounds list');
      this.total_count = this.roundlist.length;
    });
  }

  selectallstdbyattendance(event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].reg_no == '0') {
          this.details[i].reg_no = '1';
          this.check_all_attendance = true;
          this.attendance.push(this.details[i])
        }
      }
    }
    else {
      for (var i = 0; i < this.details.length; i++) {
        if (this.details[i].reg_no == '1') {
          this.details[i].reg_no = '0';
          this.check_all_attendance = false;
          for (var jk = 0; jk < this.attendance.length; jk++) {
            if (this.attendance[jk]) {
              this.attendance.splice(jk, 1);
            }
          }
        }
      }
    }
    console.log(this.attendance);
    this.present_count = this.attendance.length;
  }


  attendedlist(event, data, ik, totalcount1) {
    console.log(totalcount1);
    this.check_all_attendance = false;
    for (var i = 0; i < this.details.length; i++) {
      if (this.details[i].university_reg_number == data && this.details[i].reg_no == '1') {
        this.details[i].reg_no = '0';
        for (var lk = 0; lk < this.attendance.length; lk++) {
          if (this.attendance[lk].university_reg_number == data) {
            this.attendance.splice(lk, 1);
            break;
          }
        }
        break;
      }
      if (this.details[i].university_reg_number == data && this.details[i].reg_no == '0') {
        this.details[i].reg_no = '1';
        this.attendance.push(this.details[i]);
        // console.log(this.details[i]);
        break;
      }

    }
    if (totalcount1 == this.attendance.length) {
      this.check_all_attendance = true;
    }
    console.log(this.attendance, 'attendance data');
    this.present_count = this.attendance.length;

  }

  selectallstdbyrounds(value) {
    console.log(value.target.checked);
    this.roundinfo = [];
    this.present_count = 0;
    for (var j = 0; j < this.roundlist.length; j++) {
      switch (value.target.checked) {
        case true:
          this.roundlist[j].check_box = true;
          this.roundinfo.push(this.roundlist[j]);
          console.log(this.roundinfo);
          this.present_count = this.present_count + 1;
          this.check_all = true;
          break;
        case false:
          this.roundlist[j].check_box = false;
          for (let jk = 0; jk < this.roundinfo.length; jk++) {
            this.roundinfo.splice(jk, 1);
          }
          console.log(this.roundinfo);
          this.present_count = 0;
          this.check_all = false;
          break;
      }
    }
  }


  roundinfo = [];

  passedlist(value, reg_no, i, totalcount) {
    this.rowdata13 = [];
    console.log(value, reg_no, this.roundlist[i].check_box);
    this.check_all = false;
    for (var j = 0; j < this.roundlist.length; j++) {
      if (this.roundlist[j].university_reg_number == reg_no) {
        switch (this.roundlist[j].check_box) {
          case false:
            this.roundlist[j].check_box = true;
            this.roundinfo.push(this.roundlist[j]);
            console.log(this.roundinfo);
            this.present_count = this.present_count + 1;
            if (totalcount == this.present_count) {
              this.check_all = true;
            }
            break;
          case true:
            this.roundlist[j].check_box = false;
            for (let jk = 0; jk < this.roundinfo.length; jk++) {
              if (this.roundinfo[jk].university_reg_number == this.roundlist[j].university_reg_number) {
                this.roundinfo.splice(jk, 1);
                break;
              }
            }
            console.log(this.roundinfo);
            this.present_count = this.present_count - 1;
            break;
        }
        break;
      }
    }
    console.log(value, reg_no, this.roundlist[i].check_box);
  }

  submitRound_data() {
    // this.rowdata13 = [];
    console.log(this.round_submit, this.roundlist, 'tezt123');

    for (var i = 0; i < this.roundlist.length; i++) {
      if (this.roundlist[i].check_box == true)
        this.submit.push(this.roundlist[i].university_reg_number);
    }
    this.sub_round['reg_nos'] = this.submit.toString();

    this.sub_round['company_id'] = this.round_submit.company_id;
    console.log(this.sub_round);
    this._apiService.submitRound_data(this.sub_round).subscribe(data => {
      console.log(data);
      if (data.data.success) {
        this.roundsdata = false;
        this.toastr.success('Submited Successfully', 'Success..!');
      }
      this.sub_round = [];
      this.roundlist = [];
      this.submit = [];

    });
  }

  reg_no = [];
  attendacedata = [];
  roll_no = [];

  submitAttendance(form, id) {
    this.attendacedata = form;
    console.log(form, id, 'submitted data');
    for (var k = 0; k < this.attendacedata.length; k++) {
      var reg_no1 = this.attendacedata[k].university_reg_number;
      this.roll_no.push(reg_no1);
    }
    console.log(this.roll_no);
    const body = {};
    body['reg_no'] = this.roll_no.toString();
    body['company_name'] = id;
    body['round'] = 'R1';
    this._apiService.addr1details(body).subscribe(data => {
      if (data.data.data == true) {
        this.openshorteddata = false;
        this.toastr.success('Submitted Successfully ', 'Success!!');
      }
    });

  }

  goChangeV(p) {
    for (var i = 0; i < this.myForm.controls['rounds']['controls'].length; i++) {
      this.myForm.controls['rounds']['controls'][i].patchValue({
        round: 'R' + (i + 1)
      })
    }
  }

  goChangeV1(p) {
    for (var i = 0; i < this.myeditForm.controls['rounds']['controls'].length; i++) {
      this.myeditForm.controls['rounds']['controls'][i].patchValue({
        round: 'R' + (i + 1)
      })
    }
  }

  gocompname() {
    console.log(this.myForm.controls['c_date']['value'].formatted, this.myForm);

    var date = this.myForm.controls['c_date'].value.formatted;
    var mon = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    this.myForm.patchValue({
      drive_name: this.myForm.controls['company'].value + '-' + mon[(new Date(date).getMonth())] + '-' + new Date(date).getFullYear()
    });


  }

  gocompname2() {
    console.log(this.myeditForm.controls['c_date'].value.formatted);

    var date = this.myeditForm.controls['c_date'].value.formatted;
    var mon = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    this.myeditForm.patchValue({
      drive_name: this.myeditForm.controls['company'].value + '-' + mon[(new Date(date).getMonth())] + '-' + new Date(date).getFullYear()
    })
  }

  sendemailbox: boolean;
  details1 = [];
  c_details: any = [];
  drivedetails1 = [];
  remainder = [];
  c_genders = '';
  c_Branches = '';
  company_backlogs = '';
  company_percentage = '';
  opensenemailbox(id) {
    // this.modalloading.open();
    this.details1 = [];
    this.stdsendsms = [];
    this.c_details = [];
    this.drivedetails1 = [];
    this.sendemailbox = true;
    this.viewroundprogresss = false;
    this.tableopen = false;
    this.loading = false;
    this.loading1 = false;
    this.openshorteddata = false;
    this.opendrivedetails = false;
    this.roundsdata = false;
    this.c_details = id;
    this.company_name = id.company;
    this.company_dispname = id.drive_dispname;
    this.company_package = id.package;
    this.company_id = id.fid;
    this.c_location = id.drive_location;
    this.drivedate = id.c_date;
    this.company_percentage = id.percentage;
    this.company_backlogs = id.backlogs;
    this.c_Branches = id.branches;
    this.c_genders = id.gender;
    this.emailform.patchValue({ subject: this.company_name + ' drive on ' + this.drivedate + ' at ' + ' ' + this.c_location });
    console.log(id, 'short list');
    this._apiService.getshortedlist(id).subscribe(data => {
      console.log(data);
      this.details1 = data.data.data;
      this.total_count = this.details1.length;
      for (var i = 0; i < this.details1.length; i++) {
        this.details1[i].reg_no = '0';
      }
    });
    const body = {};
    body['drive_dispname'] = id.fid;
    this._apiService.getDrivedetails(body).subscribe(data => {
      this.drivedetails1 = data.data.data;
      console.log(this.drivedetails1);
    });

    body['drive_dispname'] = id.fid;
    this._apiService.getremainder(body).subscribe(data => {
      this.remainder = data.data.data;
      console.log(this.remainder);
    });
  }

  closeemailbox() {
    this.sendemailbox = false;
  }

  scrollto() {
    window.scrollTo(0, 700);
  }

  stdsendsms = [];
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

  semailtoselectedstd(event, dataid, data, id, totalcount4) {
    console.log(event.target.checked, dataid, data, id, totalcount4);
    this.emailcheck = false;
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
    if (totalcount4 == this.stdsendsms.length) {
      this.emailcheck = true;
    }
  }

  description = '';
  content() {
    this.description = this.emailform.controls['description'].value;
  }

  sendsms(data) {
    console.log(data);
    const body = {
      toemail: data,
      fromemail: this.emailform.controls['fromemail'].value,
      ccmail: this.emailform.controls['ccmail'].value,
      subject: this.emailform.controls['subject'].value,
      description: this.emailform.controls['description'].value,
      round_details: this.drivedetails1,
      remainder: this.remainder.length,
      company_id: this.c_details.fid,
      company_name: this.c_details.company,
      company_location: this.c_details.location,
      company_drive_dt: this.c_details.c_date,
      company_package: this.c_details.package,
      drive_location: this.c_details.drive_location,
      company_percentage: this.c_details.percentage,
      company_backlogs: this.c_details.backlogs,
      company_branches: this.c_details.branches,
      company_genders: this.c_details.gender,
    };
    console.log(body);
    this.modalloading.open();
    this._apiService.sendsmstostd(body).subscribe(data => {
      console.log(data, 'testing search data');

      if (data.data.data2) {
        this.toastr.success('Successfully Mails Sent', 'Success!!')
        this.modalloading.close();
        this.stdsendsms = [];
        this.c_details = [];
        this.drivedetails1 = [];
        this.sendemailbox = false;
        this.tableopen = false;
      }
      else {
        this.toastr.warning('Only a few selected emails have been delivered', 'warning!!')
        this.stdsendsms = [];
        this.modalloading.close();
        this.c_details = [];
        this.drivedetails1 = [];
        this.sendemailbox = false;
        this.tableopen = false;
      }
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

  tableopen: boolean;
  opentable() {
    this.tableopen = true;
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

}
