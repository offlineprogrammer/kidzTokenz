import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppRate } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewController: ViewController, public platform: Platform, public userService: UserData,) {
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
}
