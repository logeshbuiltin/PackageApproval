import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  loginForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.username == 'admin' && this.password == 'admin@123'){
      localStorage.setItem('userData', "admin");
      this.router.navigate(["/dashboard"]);
     }else if(this.username == 'user' && this.password == 'user@123'){
      localStorage.setItem('userData', "user");
      this.router.navigate(["/dashboard"]);
     }
  }

}
