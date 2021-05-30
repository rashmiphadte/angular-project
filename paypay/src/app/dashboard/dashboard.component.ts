import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string;

  constructor(private api: ServiceService) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')
    console.log(this.role)
    console.log(typeof this.role)
    this.api.getEmployeeData().subscribe(res => {
      sessionStorage.setItem('emp_id', res.data._id)
    })
  }

}
