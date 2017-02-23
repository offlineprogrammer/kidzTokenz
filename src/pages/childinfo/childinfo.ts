import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Child } from '../../models/child';
import { TokentypePage } from '../tokentype/tokentype';
import { TokennumbersPage } from '../tokennumbers/tokennumbers';
import { TaskInfoPage } from '../task-info/task-info';
import { DataService } from '../../providers/data-service';
import { AddTaskModal } from './add-task-modal';
import { Task } from '../../models/task';
import { UserData } from '../../providers/user-data';
import { GAService } from '../../providers/ga-service';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalController: ModalController,
    private dataService: DataService,
    public userService: UserData,
    private gaService: GAService) {
    this.oChild = navParams.get('child');
    this.isGuestUser = this.userService.isGuestUser;
    this.gaService.track_page_view('ChildInfo');
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
    });
    modal.present();
  }

  changeTokenNumbers(): void {
    let modal = this.modalController.create(TokennumbersPage, { tokenNumbers: this.oChild.srcTokenNumbers });
    modal.onDidDismiss(data => {
      this.oChild.tokenNumbers = data.tokenNumbers;
      this.oChild.srcTokenNumbers = 'assets/images/' + this.oChild.tokenNumbers + '.png';
      this.updateData();
    });
    modal.present();
  }


  addNewTask(data: any): void {
    let modal = this.modalController.create(AddTaskModal, { 'child': this.oChild });
    modal.present();

  }

  itemSelected(data: Task): void {
    this.navCtrl.push(TaskInfoPage, { task: data, child: this.oChild });

    console.log(data);

  }

  deleteChild(data: Child): void {

    this.dataService.deleteKid(data)
      .then(() => {
        this.navCtrl.pop();
      });
  }


  private updateData(): void {
    this.oChild.srcTokenNumbers = 'assets/images/' + this.oChild.tokenNumbers + '.png',
      this.dataService.updateKids()
        .then(() => { });
  }


}
