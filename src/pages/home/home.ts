import { Component } from '@angular/core';
import { Child } from '../../models/child';
import { NavController, ModalController, LoadingController, Events } from 'ionic-angular';
import { Splashscreen } from 'ionic-native/splash-screen';
import { AddKidModal } from './add-kid-modal';
import { DataService } from '../../providers/data-service';
import { ChildinfoPage } from '../childinfo/childinfo';
import { AppInfoPage } from '../app-info/app-info';
import { UserData } from '../../providers/user-data';
import { GAService } from '../../providers/ga-service';
import { Platform } from 'ionic-angular';

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
    public userService: UserData,
    private gaService: GAService,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public events: Events) {
    this.isGuestUser = this.userService.isGuestUser;
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.dataService.getKids()
      .then((response) => {
        this.kids = response;
        loader.dismiss()
      });
    this.gaService.track_page_view('HomePage');
    Splashscreen.hide();

      platform.registerBackButtonAction(() => {

         this.navCtrl.setRoot(HomePage, {});

    });



  }

  ngOnInit() {
    this.events.subscribe('child:deleted', () => {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.dataService.getKids()
        .then((response) => {
          this.kids = response;
          loader.dismiss()
        });
    });
  }

  ionViewWillLeave() {


  }

  addNewKid(): void {
    let modal = this.modalController.create(AddKidModal);
    modal.onDidDismiss(data => {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.dataService.getKids()
        .then((response) => {
          this.kids = response;
          loader.dismiss()
        });
    });
    modal.present();
  }

  showInfo(): void {
    let modal = this.modalController.create(AppInfoPage);
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
      content: "Please wait..."
    });
    loader.present();
  }
}
