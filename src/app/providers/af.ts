// src/app/providers/af.ts
import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public registeredUsers: FirebaseListObservable<any>;
  public displayName: any;
  public email: any;
  public user: FirebaseObjectObservable<any>;
  public uid: any;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = this.af.database.object('users/' + auth.uid);
          this.uid = auth.uid;
          console.log("construct ----> uid");
          console.log(this.uid);
        }
      });
    this.messages = this.af.database.list('messages');
    this.registeredUsers = this.af.database.list('registeredUsers');
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  login(email, password) {
    console.log(email);
    console.log(password);
    return this.af.auth.login(
    {
      email: email,
      password: password,
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }

  /**
 * Saves a message to the Firebase Realtime Database
 * @param text
 */

 sendMessage(text) {

     let message = {
       message: text,
       displayName: this.displayName,
       email: this.email,
       timestamp: Date.now()
     };
     console.log(message.displayName);
     this.messages.push(message);
 }


 /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
   registerUser(email, password) {
     console.log(email);
     return this.af.auth.createUser({
       email: email,
       password: password,
     });
   }


   /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
   saveUserInfoFromForm(uid, name, email, lat, lng) {
     console.log("Save user information");
     return this.af.database.object('registeredUsers/' + uid).set({
       displayName: name,
       email: email,
       lat: lat,
       lng: lng
     });
   }

   updateUserLocation(lat, lng) {
     console.log("Saveing user's latest location...");
     return this.af.database.object('registeredUsers/' + this.uid).update({
       lat: lat,
       lng: lng
     })
   }

   getUserName(uid: string) {
     return this.af.database.object('registeredUsers/' + uid);
   }

   getUserEmail() {
     return this.af.database.object('email');
   }



   /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
   loginWithEmail(email, password) {
     return this.af.auth.login({
       email: email,
       password: password,
     },
     {
       provider: AuthProviders.Password,
       method: AuthMethods.Password,
     });
   }
}
