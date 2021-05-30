import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews = []
  showReviewForm = false
  employees: any;
  reviewForm = new FormGroup({
    emp_id: new FormControl(''),
    work_performance: new FormControl(''),
    goal_achievement: new FormControl(''),
    suggestions: new FormControl(''),
    comments: new FormControl(''),
  });
  constructor(private api: ServiceService, public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.getAllReviews()
    this.api.getAllEmployees().subscribe(res => {
      this.employees = res.data
    })
  }

  getAllReviews() {
    this.api.getAllReviews().subscribe(res => {
      this.reviews = res.data
    })
  }
  editReview() {

  }
  deleteReview() {

  }
}
