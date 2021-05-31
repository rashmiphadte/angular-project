import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private api: ServiceService, private router: Router) { }
  signInForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    contact: new FormControl('')

  });
  ngOnInit(): void {
  }

  signIn() {
    let user = {
      name: this.signInForm.value.name,
      email: this.signInForm.value.email,
      contact: this.signInForm.value.contact,
      password: this.signInForm.value.password
    }
    this.api.signInUser(user).subscribe(res => {
      console.log(res.token)
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('role', res.role)
      this.router.navigate(['/dashboard']);
    })
  }
}
