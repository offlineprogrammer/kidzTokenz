import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { Facebook } from 'ionic-native';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  facebookLogin() {
    Facebook.login(['email']).then((response) => {


      this.authData.loginUser(response.authResponse.accessToken)
        .then(response => {
          console.log('test');
          this.navCtrl.push(HomePage, {});

        }, function (error) {
          console.log(error);
        });



    }).catch((error) => { console.log(error) });
  }



}
