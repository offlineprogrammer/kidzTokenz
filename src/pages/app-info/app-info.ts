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


}
