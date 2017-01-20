import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  facebookLogin(){


  
    this.authData.facebookLogin();


}

}
