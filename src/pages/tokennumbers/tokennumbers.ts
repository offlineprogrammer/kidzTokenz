import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

/*
  Generated class for the Tokennumbers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tokennumbers',
  templateUrl: 'tokennumbers.html'
})
export class TokennumbersPage {
  tokenNumbers: string;
  tokenNumbersArray: string[];
  constructor(private dataService: DataService, public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, ) {
    this.tokenNumbers = navParams.get('tokenNumbers');
    this.tokenNumbersArray = this.fillArrayWithNumbers(9);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokennumbersPage');
  }

  fillArrayWithNumbers(n: number) {
    let nArray = [];
    nArray = Array.apply(null, Array(n));
    return nArray.map(function (x, i) {
      return 'assets/images/' + (i + 1) + '.png';
    });
  }

  itemSelected(data: string): void {
    let ntokenNumbers = data.match(/\d+/);
    console.log(ntokenNumbers);
    console.log(ntokenNumbers[0]);
    this.viewCtrl.dismiss({ tokenNumbers: ntokenNumbers[0] });
  }

  dismiss() {
    let ntokenNumbers = this.tokenNumbers.match(/\d+/);
    this.viewCtrl.dismiss({ tokenNumbers: ntokenNumbers[0] });
  }



}
