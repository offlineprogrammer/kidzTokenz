import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Child } from '../../models/child';

/*
  Generated class for the Childinfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-childinfo',
  templateUrl: 'childinfo.html'
})
export class ChildinfoPage {
  oChild: Child

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.oChild = navParams.get('child');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildinfoPage');
  }

}
