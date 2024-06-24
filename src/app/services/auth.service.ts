import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Observable, from } from 'rxjs';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  public loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }

  public loginWithFacebook() {
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
  }

  /* public logout() : Observable<any> {
    return from(this.auth.signOut());
  } */
}
