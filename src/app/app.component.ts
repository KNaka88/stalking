import { Component } from '@angular/core';
import { AF } from './providers/af';
import { Router } from '@angular/router';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AF]
})
export class AppComponent {
  public isLoggedIn: boolean;

  constructor(public afService: AF, private router: Router) {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    // This is just a small thing that Firebase does that makes it easy to use.
  this.afService.af.auth.subscribe(
    (auth) => {
        if (auth === null) {
          console.log('Not Logged in');
          this.isLoggedIn = false;
          this.router.navigate(['register']);
        } else {
          console.log('successfully logged in');

          if(auth.google) {
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
          } else {

            this.afService.displayName = auth.auth.email;
            // this.afService.displayName = afService.getUserName(auth.uid);
            console.log('checking...');
            console.log(this.afService.displayName)
            this.afService.email = auth.auth.email;

            this.isLoggedIn = true;
            this.router.navigate(['']);
          }
        }
      }
    );
  }

  logout() {
    this.afService.logout();
  }
}
