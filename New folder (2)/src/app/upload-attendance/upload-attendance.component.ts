import { Component, OnInit, Output, Input, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http";
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TruncatePipe } from '../common/truncate.pipe';
import { ModalModule } from "ngx-modal";

declare var $;

@Component({
  selector: 'app-upload-attendance',
  templateUrl: './upload-attendance.component.html',
  styleUrls: ['./upload-attendance.component.css']
})
export class UploadAttendanceComponent implements OnInit {

  d = new Date();
  model: any = {};
  row: any = {};
  error_message;
  machines;
  data;
  deleteError: boolean;
  deleteErrorMsg: string;
  // for file upload
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object;
  doc_options: Object;
  sizeLimit = 20000;
  // end file upload (20 kb)

  public filterQuery = "";
  public rowsOnPage = 50;
  public sortOrder = "desc";

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    disableSince: { year: this.d.getFullYear(), month: (this.d.getMonth() + 1), day: (this.d.getDate() + 1) },
    editableDateField: false
  };

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this._apiService.page = "upload_attendance";
    this.getActiveMachines();
    this.getUploadHistory();
  }

  onDateChanged(event) {
    this.model.date = event.date.year + '-' + ('0' + event.date.month).slice(-2) + '-' + ('0' + event.date.day).slice(-2);
  }

  getActiveMachines() {
    this._apiService.getMachines().subscribe(data => {
      this.machines = data.data;
      // console.log("###",data.data, this.machines);
    });
  }

  getUploadHistory() {
    this._apiService.getUploadHistory().subscribe(data => {
      this.data = data.data;
      // console.log("###",data.data, this.machines);
    });
  }

  deleteUploadFile() {
    this._apiService.deleteUploadFile(this.row.id).subscribe(data => {
      if (data.data.succcess) {
        this.toastr.success('Uploaded File and Data Removed Successfully..!', 'Success!');
        this.getUploadHistory();
      } else {
        // this.toastr.error('Unable to Complete Request..!', 'Error!');
      }
    });
  }

  startFileUpload() {
    this.doc_options = {
      url: AppSettings.UPLOAD_ATT_DATA_API,
      data: { mid: this.model.machine },
      authToken: localStorage.getItem('currentUser')
    };
    console.log('starting...');
  }

  docHandleUpload(data): void {
    console.log(data);
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      this.toastr.success('File Uploaded Successfully..!', 'Success!');
      this.model = {};
      this.getUploadHistory();
      // this._router.navigate(['/upload_attendance']);
      window.location.reload();
      // alert('File Uploaded');
    } else {
      // this.toastr.error('Unable to Complete Request..!', 'Error!');
    }
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.toastr.error('Image size too large..!', 'Warning!');
      // alert('File is too large');
    }
  }

}
