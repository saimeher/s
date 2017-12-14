import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, ElementRef, ViewContainerRef, Input, AUTO_STYLE } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from "@angular/forms";
import { ModalModule } from "ngx-modal";
import { CustomValidators } from 'ng2-validation';
import * as Highcharts from 'highcharts';
import { NouisliderComponent } from 'ng2-nouislider';
import { log } from 'util';


@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {
  attendcount: number = 0;
  check;
  dat;
  data;
  data1;
  true1 =false;
  placed;
  attended;
  placed_count;
  table = false;
  dtaa;
  all1=[];
  status;
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  @ViewChild('company') modal: any;
  date1 = '';
  d = new Date();
  obj = new Object();
 
  companyselected =false;
  regno = localStorage.getItem('reg_no');
  branch = localStorage.getItem('branch_id');
  college = localStorage.getItem('college_id');

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getterms();
    this.getattendedlist();
    this.getcompanylist();
    this.checkstatus();
    console.log(this.branch,this.college);
    this.date1 = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate();
   
  }
  terms()
  {
    let bod={}
    bod['reg_no']=this.regno;
    this._apiService.terms(bod).subscribe(dat=>
    {
      this.dat = dat.data;
      this.getterms();
      this.true1= true;
    })
  }
  
  getterms()
  {
    let bod={}
    bod['reg_no']=this.regno;
    this._apiService.getterms(bod).subscribe(data=>
    {
      if(data.data.getterms)
      {
        this.data1 = data.data.getterms.confirmation;
        this.data =parseInt(this.data1);
        if(this.data != 1)
        {
          this.table == true;
        }
        this.true1 =true;
      }
     
      console.log(this.data);
    })
  }
  getattendedlist()
  {
    let bod={}
    bod['reg_no']=this.regno;
    this._apiService.getattendedlist(bod).subscribe(data=>
    {
     this.attendcount = data.data.attencount.length;
     this.placed = data.data.placed;
     this.placed_count =data.data.placed.length;
     this.attended =data.data.attended;
     console.log(this.attended);

     
      console.log(this.attendcount);
    })
  }
  attendedlist()
  {
    this.data =this.attended;
    console.log(this.data);
    this.companyselected = false;
    this.true1= true;
    this.modal.open();
  }

  selectedlist()
  {
    this.placed =this.placed;
    console.log(this.data);
    this.true1= true;
    this.companyselected = true;
    this.modal.open();
  }

  getcompanylist()
  {
    let bod={}
    bod['reg_no']=this.regno;
    bod['branch_id'] = this.branch;
    bod['college_id'] = this.college;
    this._apiService.getcompanineslist(bod).subscribe(data=>
    {
     this.dtaa =data.data.data;
     this.check = data.data.check;
     console.log(data.data.data);
    
      for(var i=0;i< data.data.data.length;i++)
      {
        for(var j=0; j<data.data.check.length;j++)
        {
          // console.log(parseInt(data.data.check[j].company_id));
          // console.log(parseInt(data.data.data[i].fid));
          let fidi = data.data.data[i].fid;
          let cid = data.data.check[j].company_id;
          
        //  if(parseInt() == parseInt(data.data.check[j].company_id))
         if(parseInt(fidi) == parseInt(cid))
         {
           if(parseInt(this.check[j].status) == 1 )
           {
           this.status = 1;
           }
          
         }
         this.obj = {
          'name': this.dtaa[0].name,
          'company': data.data.data[0].company,
          'status' : this.status
        };
        }
        
        this.all1.push(this.obj);
        
      }
      console.log(this.all1,'sgdfjsdgfjkgsdfs');
    })
  }

  yes(id)
  {
console.log(id);
let bod={}
bod['reg_no']=this.regno;
bod['branch_id'] = this.branch;
bod['college_id'] = this.college;
bod['company_id'] = id.fid

     this._apiService.sendconfromation(bod).subscribe(data=>
    {
      this.data = data.data;
    })
  }

  checkstatus()
  {
    let bod={}
    bod['reg_no'] = this.regno;
    this._apiService.checkstatus(bod).subscribe(dat=>
    {
      this.check =dat.data.data;
      console.log(this.check);
    })
  }

 

}
