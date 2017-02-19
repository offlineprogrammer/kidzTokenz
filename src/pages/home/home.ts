import { Component } from '@angular/core';
import { Child } from '../../models/child';
import { NavController, ModalController,LoadingController  } from 'ionic-angular';
import { AddKidModal } from './add-kid-modal';
import { DataService } from '../../providers/data-service';
import { StorageData } from '../../providers/storage-data';
import { ChildinfoPage } from '../childinfo/childinfo';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  kids: Child[] = [];
  public isGuestUser: boolean;

  constructor(public navCtrl: NavController,
    private modalController: ModalController,
    public dataService: DataService,
    public storageService: StorageData,
    public userService: UserData,
    public loadingCtrl: LoadingController) {
      this.isGuestUser = this.userService.isGuestUser;
       this.dataService.getKids()
      .then((response) => {
        this.kids = response;
      });




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
    this.navCtrl.push(ChildinfoPage, {
      child: data
    });
    console.log(data);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }


}
