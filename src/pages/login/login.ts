import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { UserData } from '../../providers/user-data';
import { HomePage } from '../home/home';
import { Facebook } from 'ionic-native';
import { GAService } from '../../providers/ga-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData, public userData: UserData, private gaService: GAService
    , public loadingCtrl: LoadingController) {
    this.gaService.track_page_view('LoginPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  facebookLogin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    Facebook.login(['email']).then((response) => {


      this.authData.loginUser(response.authResponse.accessToken)
        .then(response => {
          console.log('test');
          loader.dismiss();
          this.navCtrl.push(HomePage, {});
          this.userData.setGuestUser(false);
          this.gaService.setUserType(false);

        }, function (error) {
          loader.dismiss();
          console.log(error);
        });



    }).catch((error) => { loader.dismiss(); console.log(error) });
  }

  contineAsGuest() {
    this.userData.setGuestUser(true);
    this.gaService.setUserType(true);
    this.navCtrl.push(HomePage, {});
  }


}
