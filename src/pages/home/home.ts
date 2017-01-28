import { Component } from '@angular/core';
import { Child } from '../../models/child';
import { NavController, ModalController } from 'ionic-angular';
import { AddKidModal } from './add-kid-modal';
import { DataService } from '../../providers/data-service';
import { ChildinfoPage } from '../childinfo/childinfo';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  kids: Child[] = [];

  constructor(public navCtrl: NavController,
    private modalController: ModalController,
    public dataService: DataService) {

    /*    this.dataService.getKidsList().on('value', snapshot => {
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              childId: snap.key,
              name: snap.val().name,
              tokenType: snap.val().tokenType,
              negativetokenType: snap.val().negativetokenType,
              tokenNumbers: snap.val().tokenNumbers,
              srcTokenNumbers: snap.val().srcTokenNumbers,
              isActive: snap.val().isActive,
              childimage: snap.val().childimage,
              tasks: snap.val().tasks
    
            });
          });
          this.kids = rawList;
        });*/

    this.dataService.getKids()
      .then((response) => {
        this.kids = response;
      });


  }

  addNewKid(): void {

    let modal = this.modalController.create(AddKidModal);
    modal.onDidDismiss(data => {
      this.dataService.getKidsList()
        .then((response) => {
          this.kids = response;
        });
    });
    modal.present();
  }

  itemSelected(data: Child): void {
    this.navCtrl.push(ChildinfoPage, {
      child: data
    });
    console.log(data);
  }


}
