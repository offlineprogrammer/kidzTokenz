import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Facebook } from 'ionic-native/facebook';
import firebase from 'firebase';
/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {

    public fireAuth: any;
    public userProfile: any;
    public isGuestUser: boolean;

    constructor(public http: Http) {
        console.log('Hello AuthData Provider');
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('/userProfile');
        this.isGuestUser = false;
    }


    loginUser(accessToken: string): any {
          let facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(accessToken);
                    console.log("Firebase  ");
        return this.fireAuth.signInWithCredential(facebookCredential)
    }

   setGuestUser(): void {
         this.isGuestUser = true;
    }


    facebookLogin(): Promise<any> {
        return new Promise((resolve, reject) => {

            Facebook.login(['email']).then((response) => {
                console.log(response.authResponse.accessToken);
                let facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(response.authResponse.accessToken);

                firebase.auth().signInWithCredential(facebookCredential)
                    .then((success) => {
                        console.log("Firebase success: " + JSON.stringify(success));
                        this.userProfile = success;
                    })
                    .catch((error) => {
                        console.log("Firebase failure: " + JSON.stringify(error));
                    });

            }).catch((error) => { console.log(error) });

            resolve(this.userProfile);

        }).catch((error) => {
            // reject('Only available on a device');
        });



       // return this.userProfile;
    }


}
