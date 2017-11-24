import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  master_role;
  utype;
  addModel:any = {};
  editModel:any = {};
  machines:any=[];
  addStatus:boolean = true;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this._apiService.page = 'machines';
    this.getActiveMachines();
  }

  getActiveMachines() {
    this._apiService.getMachines().subscribe(data => {
      this.machines = data.data;
    });
  }

  activeAdd() {
    this.addStatus = true;
  }
  
  saveMachine() {
    this._apiService.addMachine(this.addModel.name).subscribe(data => {
      if(data.data.success) {
        this.toastr.success('Machine Added Successfully..!', 'Success!');
        this.getActiveMachines();
        this.addModel = {};
      }
      
    });
  }

  updateMachine() {
    this._apiService.updateMachine(this.editModel.name, this.editModel.mid).subscribe(data => {
      if(data.data.success) {
        this.toastr.success('Machine Updated Successfully..!', 'Success!');
        this.getActiveMachines();
        this.addModel = {};
        this.activeAdd();
      }    
      
    });
  }

  editMachine(dt) {
    this.editModel = dt;
    this.addStatus = false;
  }

}
