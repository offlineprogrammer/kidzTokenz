import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController,Events } from 'ionic-angular';
import { AppRate } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Facebook } from 'ionic-native';
import { AuthData } from '../../providers/auth-data';
import { GAService } from '../../providers/ga-service';

/*
  Generated class for the AppInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-app-info',
  templateUrl: 'app-info.html'
})
export class AppInfoPage {
  appRate: any = AppRate;
  public isGuestUser: boolean;

  constructor( private viewCtrl: ViewController,  public events: Events,public navCtrl: NavController, public navParams: NavParams, public authData: AuthData, private gaService: GAService, private viewController: ViewController, public platform: Platform, public userService: UserData, public loadingCtrl: LoadingController) {
    this.isGuestUser = this.userService.isGuestUser;
    this.platform.ready().then(
      () => this.appRate.preferences.storeAppURL = {
        ios: '1150112049',
        android: 'market://details?id=com.offlineprogrammer.KidzTokenz'
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppInfoPage');
  }


  close() {
    this.viewController.dismiss();
  }

  rateApp() {
    AppRate.promptForRating(true);
  }

  facebookLogin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    Facebook.login(['email']).then((response) => {


      this.authData.loginUser(response.authResponse.accessToken)
        .then(response => {
          console.log('logged ok');
          loader.dismiss();
          //     this.navCtrl.push(HomePage, {});
          this.userService.setGuestUser(false);
          this.gaService.setUserType(false);
          let data = { 'user': 'login' };
          this.viewCtrl.dismiss(data);
           
          this.close();

        }, function (error) {
          loader.dismiss();
          console.log(error);
        });



    }).catch((error) => { loader.dismiss(); console.log(error) });
  }


  facebookLogout() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    Facebook.logout().then((response) => {


      this.authData.logOutUser()
        .then(response => {
          console.log('test');
          loader.dismiss();
          //     this.navCtrl.push(HomePage, {});
          this.userService.setGuestUser(true);
          this.gaService.setUserType(true);
          this.close();

        }, function (error) {
          loader.dismiss();
          console.log(error);
        });



    }).catch((error) => { loader.dismiss(); console.log(error) });
  }
}
