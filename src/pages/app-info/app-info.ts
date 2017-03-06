import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewController: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppInfoPage');
  }


   close() {
    this.viewController.dismiss();
  }


}
