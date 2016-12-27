import { Component } from '@angular/core';
import { Child } from '../../models/child';
import { NavController, ModalController } from 'ionic-angular';
import { AddKidModal } from './add-kid-modal';
import { DataService } from '../../providers/data-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  kids: Child[] = [];

  constructor(public navCtrl: NavController,
    private modalController: ModalController,
    public dataService: DataService) {

  }

  addNewKid(): void {
    let modal = this.modalController.create(AddKidModal);
    modal.onDidDismiss(data => {
      this.dataService.getKids()
        .then((response) => {

          this.kids = response;

        });
    });

    modal.present();

  }

  itemSelected(data: Child): void {
    /*this.navCtrl.push(ChildInfo, {
      child: data

    });*/

    console.log(data);

  }


}
