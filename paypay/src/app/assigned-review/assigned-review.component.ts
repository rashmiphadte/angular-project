import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assigned-review',
  templateUrl: './assigned-review.component.html',
  styleUrls: ['./assigned-review.component.css']
})
export class AssignedReviewComponent implements OnInit {
  allreviews = []
  constructor(private api: ServiceService, public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.api.getAssignedReviews().subscribe(res => {
      this.allreviews = res.data
    })
  }

  submitFeedback() {

  }

}
