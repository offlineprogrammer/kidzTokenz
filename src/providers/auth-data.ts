import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Facebook } from 'ionic-native';
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

    constructor(public http: Http) {
        console.log('Hello AuthData Provider');
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('/userProfile');
    }


    loginUser(email: string, password: string): any {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    }

    facebookLogin(): Promise<any> {
        return new Promise((resolve, reject) => {

            Facebook.login(['email']).then((response) => {
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
