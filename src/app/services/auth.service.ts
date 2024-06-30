import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  public logged() {
    // console.log(this.auth.user);
    return this.auth.user;
  }

  public loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  public loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  public logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
