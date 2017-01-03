import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { Child } from '../../models/child';
import { TokentypePage } from '../tokentype/tokentype';
import { TokennumbersPage } from '../tokennumbers/tokennumbers';
import { DataService } from '../../providers/data-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  private modalController: ModalController,  private dataService: DataService,) {
    this.oChild = navParams.get('child');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildinfoPage');
  }

    changeToken(): void {
        let modal = this.modalController.create(TokentypePage, {selectedToken: this.oChild.tokenType});
    modal.onDidDismiss(data => {
     this.oChild.tokenType = data.selectedToken;
      this.updateData();
    });

    modal.present();
    }

      changeTokenNumbers(): void {
        let modal = this.modalController.create(TokennumbersPage, {tokenNumbers: this.oChild.srcTokenNumbers});
    modal.onDidDismiss(data => {
     this.oChild.tokenNumbers = data.tokenNumbers;
     this.oChild.srcTokenNumbers = 'assets/images/' + this.oChild.tokenNumbers + '.png';
     this.updateData();
    });

    modal.present();
    }



   


    private updateData(): void {
      this.oChild.srcTokenNumbers = 'assets/images/' + this.oChild.tokenNumbers + '.png',
        this.dataService.updateKids()
            .then(() => {});
    }


}
