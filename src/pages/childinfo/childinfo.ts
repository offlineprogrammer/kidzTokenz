import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, LoadingController,Platform } from 'ionic-angular';
import { Child } from '../../models/child';
import { TokentypePage } from '../tokentype/tokentype';
import { TokennumbersPage } from '../tokennumbers/tokennumbers';
import { TaskInfoPage } from '../task-info/task-info';
import { DataService } from '../../providers/data-service';
import { AddTaskModal } from './add-task-modal';
import { Task } from '../../models/task';
import { UserData } from '../../providers/user-data';
import { GAService } from '../../providers/ga-service';
import { GAEvent } from '../../models/gaEvent';
import { AppRate } from 'ionic-native';

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
  public isGuestUser: boolean;
    appRate: any = AppRate;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalController: ModalController,
    private dataService: DataService,
    public userService: UserData,
    private gaService: GAService,
    public loadingCtrl: LoadingController,
     private platform: Platform,
    public events: Events) {
    this.oChild = navParams.get('child');
    this.isGuestUser = this.userService.isGuestUser;
    this.gaService.track_page_view('ChildInfo');
    this.platform.ready().then(
      () => this.appRate.preferences.storeAppURL = {
        ios: '1150112049',
        android: 'market://details?id=com.offlineprogrammer.KidzTokenz'
      }
    )
  }

  rateApp() {
    AppRate.promptForRating(true);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildinfoPage');
  }

  changeToken(): void {
    let modal = this.modalController.create(TokentypePage, { selectedToken: this.oChild.tokenType });
    modal.onDidDismiss(data => {
      this.oChild.tokenType = data.selectedToken;
      this.oChild.negativetokenType = data.selectedToken.replace('assets/images/', 'assets/images/bad-');
      this.updateData();
      this.trackEvent('ChildInfo', 'changeToken', this.oChild.tokenType, 0);
    });
    modal.present();
  }

  changeTokenNumbers(): void {
    let modal = this.modalController.create(TokennumbersPage, { tokenNumbers: this.oChild.srcTokenNumbers });
    modal.onDidDismiss(data => {
      this.oChild.tokenNumbers = data.tokenNumbers;
      this.oChild.srcTokenNumbers = 'assets/images/' + this.oChild.tokenNumbers + '.png';
      this.updateData();
      this.trackEvent('ChildInfo', 'changeTokenNumbers', this.oChild.srcTokenNumbers, 0);
    });
    modal.present();
  }

  trackEvent(sCategory: string,
    sAction: string,
    sLabel: string,
    nValue: number) {
    let oGAEvent: GAEvent;
    oGAEvent = {
      category: sCategory,
      action: sAction,
      label: sLabel,
      value: nValue
    };
    this.gaService.trackEvent(oGAEvent);
  }



  addNewTask(data: any): void {
    let modal = this.modalController.create(AddTaskModal, { 'child': this.oChild });
    modal.onDidDismiss(data => {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      setTimeout(() => {
        loader.dismiss();
      }, 2000);

    });
    modal.present();

  }

  itemSelected(data: Task): void {
    this.navCtrl.push(TaskInfoPage, { task: data, child: this.oChild });

    console.log(data);

  }

  deleteChild(data: Child): void {

    this.dataService.deleteKid(data)
      .then(() => {
        this.trackEvent('ChildInfo', 'deleteChild', '', 0);
        this.events.publish('child:deleted');
        this.navCtrl.pop();
      });
  }


  private updateData(): void {
    this.oChild.srcTokenNumbers = 'assets/images/' + this.oChild.tokenNumbers + '.png',
      this.dataService.updateKids()
        .then(() => { });
  }


}
