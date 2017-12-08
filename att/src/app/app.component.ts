import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  role;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService: ApiService
  ) { }
  ngOnInit() {
    this._apiService.getRole().subscribe(data => {
      // if (data.data.success) {
        this.role = data.data.role;
        if (this.role == 'staff') {
          this.router.navigate(['/attendance']);
        }
        if (this.role != 'staff') {
          this.router.navigate(['/dashboard']);
        }
        console.log(this.role);
      // }
    });
    
  }
  
}
