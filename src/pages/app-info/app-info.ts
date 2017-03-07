import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppRate } from 'ionic-native';
import { Platform } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewController: ViewController, public platform: Platform) {
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
