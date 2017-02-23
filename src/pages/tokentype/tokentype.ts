import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { GAService } from '../../providers/ga-service';

/*
  Generated class for the Tokentype page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tokentype',
  templateUrl: 'tokentype.html'
})
export class TokentypePage {
  selectedToken: string;
  tokenTypes: string[];

  constructor(
    private dataService: DataService, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController, 
    private gaService: GAService) {
    this.selectedToken = navParams.get('selectedToken');
    this.tokenTypes = dataService.getTokenTypes();
    this.gaService.track_page_view('TokentypePage');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokentypePage');
  }

  itemSelected(data: string): void {

    this.viewCtrl.dismiss({ selectedToken: data });


  }

  dismiss() {
    this.viewCtrl.dismiss({ selectedToken: this.selectedToken });
  }


}
