import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { UserData } from '../providers/user-data';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class KidzTokenz {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform, public userData: UserData) {
    this.zone = new NgZone({});
    userData.getGuestUser()
      .then((response) => {
        if (userData.isGuestUser) {
          this.rootPage = HomePage;
        } else {
          firebase.initializeApp({
            apiKey: "AIzaSyCh4LNH_Srbq7LXCC8QRUnz2BiodEvK5MQ",
            authDomain: "kidztokenz.firebaseapp.com",
            databaseURL: "https://kidztokenz.firebaseio.com",
            storageBucket: "kidztokenz.appspot.com",
            messagingSenderId: "910876779586"
          });
          const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.zone.run(() => {
              if (!user) {
                this.rootPage = LoginPage;
                unsubscribe();
              } else {
                this.rootPage = HomePage;
                unsubscribe();
              }
            });
          });
        }
      });





    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
