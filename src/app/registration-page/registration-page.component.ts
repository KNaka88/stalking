import { Component} from '@angular/core';
import { AF } from '../providers/af';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  public error: any;

  constructor(private afService: AF, private router: Router) { }


  // registers the user and logs them in
  register(event, name, email, password) {
    //default position (when it failed to get user's position)
    let lat: number = 45.5206223;
    let lng: number = -122.6795871;

    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email, lat, lng).then(() => {
        this.router.navigate(['']);
      })
      // when register user method failed, catch error
      .catch((error) => {
        this.error = error;
      });
    })
      // when register method failed, catch error
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }


}
