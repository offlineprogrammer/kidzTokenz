import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
import { Child } from '../../models/child';
import { Task } from '../../models/task';

/*
  Generated class for the TaskInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-info',
  templateUrl: 'task-info.html'
})
export class TaskInfoPage {
  oChild: Child;
  oTask: Task;
  tokenNumbers: number[];
  tokenstriples: number[];
  bSocialSharing: boolean = false;
  sTaskscreen: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private dataService: DataService,) {
    this.oTask = navParams.get('task');
    this.oChild = navParams.get('child');
    this.tokenNumbers = this.fillArrayWithNumbers(+this.oChild.tokenNumbers);
    this.tokenstriples = this.getTriples();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskInfoPage');
  }

    fillArrayWithNumbers(n: number) {
    let nArray = [];
    nArray = Array.apply(null, Array(n));
    return nArray.map(function(x, i) {
      return i;
    });
  }

  getTriples() {
    let triples = [];
    let length = this.tokenNumbers.length;
    for (let i = 0; i < length; i += 2) {
      let trio = [];
      trio.push(this.tokenNumbers[i]);
      if (i + 1 < length) {
        trio.push(this.tokenNumbers[i + 1]);
      }
      triples.push(trio);
    }
    return triples;
  }

   private updateData(): void {
    this.dataService.updateKids()
      .then(() => {
        if (this.oTask.score === this.oChild.tokenNumbers) {
          // this.playSound('win');
        }
        // let oGAEvent: GAEvent;
        // oGAEvent = {
        //   category: 'Task',
        //   action: 'UpdateScore',
        //   label: this.oTask.name,
        //   value: this.oTask.score
        // };
        // this.gaService.trackEvent(oGAEvent);


      });
  }

    addToken(): void {
    console.log(this.oTask.score);
    this.oTask.score++;
    this.updateData();
    console.log(this.oTask.score);
  }

  removeToken(): void {
    console.log(this.oTask.score);
    this.oTask.score--;
    this.updateData();
    console.log(this.oTask.score);
  }

  resetScore(): void {
    this.oTask.score = 0;
    this.updateData();
  }

  deleteTask(data: Task): void {

    let index = this.oChild.tasks.indexOf(data);

    if (index > -1) {
      this.oChild.tasks.splice(index, 1);
    }
    this.updateData();

    this.navCtrl.pop();

  }
  



}