import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { StaffComponent } from './staff/staff.component';
import { UploadAttendanceComponent } from './upload-attendance/upload-attendance.component';
import { MachinesComponent } from './machines/machines.component';
import { MonthrangerComponent } from './monthranger/monthranger.component';
import { RangerComponent } from './ranger/ranger.component';
import { ReportComponent } from './report/report.component';
import { AttendanceComponent } from 'app/attendance/attendance.component';
import { AppSettings } from 'app/app.settings'




const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'admin,management,attendance' } },
    // { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard], data: { role: 'admin,management,attendance' } },
    { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard], data: { role: 'staff'} },
    { path: 'ranger', component: RangerComponent, canActivate: [AuthGuard], data: { role: 'admin,management,attendance' } },
    { path: 'upload_attendance', component: UploadAttendanceComponent, canActivate: [AuthGuard], data: { role: 'admin,management,attendance' } },
    { path: 'machines', component: MachinesComponent, canActivate: [AuthGuard], data: { role: 'admin,management,attendance'} },
    { path: 'monthranger', component: MonthrangerComponent, canActivate: [AuthGuard], data: { role: 'admin,management,attendance'} },
    { path: '', redirectTo: "dashboard", pathMatch: "full" },
    { path: '**', redirectTo: "dashboard", pathMatch: "full", }

];

// const appRoutes: Routes = [
//     { path: 'login', component: LoginComponent },
//     { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//     { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard] },
//     { path: '', redirectTo: "dashboard", pathMatch: "full" },
//     { path: '**', redirectTo: 'dashboard', pathMatch: "full" }
// ];

export const routing = RouterModule.forRoot(appRoutes);