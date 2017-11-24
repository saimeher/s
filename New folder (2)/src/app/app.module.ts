import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2UploaderModule } from 'ng2-uploader';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from "angular2-datatable";
import { ModalModule } from "ngx-modal";


import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { routing } from './app.routing';

import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/authentication.service';
import { ExportService } from './common/export.service';


import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './common/header/header.component';
import { SidemenuComponent } from './common/sidemenu/sidemenu.component';
import { LogoutComponent } from './logout/logout.component';
import { DateComponent } from './common/date/date.component';
import { TruncatePipe } from './common/truncate.pipe';
import { DataFilterPipe } from './common/data-filter.pipe';
import { UploadAttendanceComponent } from './upload-attendance/upload-attendance.component';
import { MachinesComponent } from './machines/machines.component';
import { ReportComponent } from './report/report.component';
import { MonthrangerComponent } from './monthranger/monthranger.component';
import { RangerComponent } from './ranger/ranger.component';
// import { StaffComponent } from './staff/staff.component';



import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidemenuComponent,
    LogoutComponent,
    DateComponent,
    DataFilterPipe,
    TruncatePipe,
    UploadAttendanceComponent,
    MachinesComponent,
    ReportComponent,
    MonthrangerComponent,
    RangerComponent,
    
    // StaffComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
    Ng2SmartTableModule,
    MyDatePickerModule,
    Ng2UploaderModule,
    ToastModule.forRoot(),
    DataTableModule,
    ModalModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    
  ],
  providers: [
    AuthGuard,
    ExportService,
    AuthenticationService, 
    ApiService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
