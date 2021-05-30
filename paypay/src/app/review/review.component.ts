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
  dropdownSettings = {}
  assignEmp = false
  reviewForm = new FormGroup({
    emp_id: new FormControl(''),
    work_performance: new FormControl(''),
    goal_achievement: new FormControl(''),
    suggestions: new FormControl(''),
    comments: new FormControl(''),
    review_period: new FormControl(''),
  });
  reviewId = null;
  dropdownList = [];
  selectedItems = []
  constructor(private api: ServiceService, public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false,
      enableCheckAll: false
    };
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
  editReview(review) {
    this.showReviewForm = true
    this.reviewId = review._id
    this.reviewForm.patchValue({
      emp_id: review.emp_id,
      work_performance: review.work_performance,
      goal_achievement: review.goal_achivement,
      suggestions: review.suggestions,
      comments: review.comments,
      review_period: review.review_period,
    })
  }
  deleteReview(id) {
    this.api.deleteReview(id).subscribe(res => {
      if (res.status) {
        this.toastr.successToastr(res.message, null, { showCloseButton: true });
      } else {
        this.toastr.successToastr(res.message, null, { showCloseButton: true });
      }
    })
    this.getAllReviews()
    this.showReviewForm = false
  }

  addReview() {
    let review = {
      emp_id: this.reviewForm.value.emp_id,
      work_performance: this.reviewForm.value.work_performance,
      goal_achivement: this.reviewForm.value.goal_achievement,
      suggestions: this.reviewForm.value.suggestions,
      comments: this.reviewForm.value.comments,
      review_period: this.reviewForm.value.review_period,
    }
    if (this.reviewId != null) {
      if (this.selectedItems.length > 0) {
        let employees = []
        this.selectedItems.forEach(element => {
          employees.push(element.item_id)
        });
        this.api.assignEmployee({ employees: employees }, this.reviewId).subscribe(res => {
          console.log(res)
        })
      } else {
        this.api.updateReview(review, this.reviewId).subscribe(res => {
          console.log(res)
          if (res.status) {
            this.toastr.successToastr(res.message, null, { showCloseButton: true });
          } else {
            this.toastr.successToastr(res.message, null, { showCloseButton: true });
          }

        })
      }

    } else {
      this.api.addReview(review).subscribe(res => {
        console.log(res)
        if (res.status) {
          this.toastr.successToastr("Review added successfully", null, { showCloseButton: true });
        } else {
          this.toastr.successToastr("Failed to add review", null, { showCloseButton: true });
        }

      })
    }
    this.getAllReviews()
    this.showReviewForm = false
  }

  assignEmployee(p) {
    this.assignEmp = true
    this.employees.forEach(ele => {
      let data = { item_id: "", item_text: "" }
      data.item_id = ele._id;
      data.item_text = ele.name
      if (p.emp_id._id != ele._id)
        this.dropdownList.push(data)
    });
    this.editReview(p)
  }

}
