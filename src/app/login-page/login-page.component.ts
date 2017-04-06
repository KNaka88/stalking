import { Component, OnInit } from '@angular/core';
import { AF } from '../providers/af';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public error: any;


  constructor(public afService: AF, private router: Router) { }
  login(e, email, password) {

    this.afService.login(email, password).then((data) => {
      this.router.navigate(['']);
    })
    .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }


  loginGoogle() {
    this.afService.loginWithGoogle().then((data) => {
      // Send them to the homepage if they are logged in
      this.router.navigate(['']);
    });
  }

  ngOnInit() {
  }

}
