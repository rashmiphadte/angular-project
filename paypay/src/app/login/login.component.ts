import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ServiceService, private router: Router,) { }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  userLogin() {
    console.log(this.loginForm.value);
    this.api.loginUser({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe(res => {
      console.log(res.token)
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('role', res.role)
      this.router.navigate(['/dashboard']);
    })
  }
}
