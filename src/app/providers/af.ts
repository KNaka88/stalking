// src/app/providers/af.ts
import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;

  constructor(public af: AngularFire) {
    this.messages = this.af.database.list('messages');
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
   console.log(message);
   this.messages.push(message);
 }

}
