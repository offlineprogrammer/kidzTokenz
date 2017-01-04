import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../providers/data-service';
import { Child } from '../../models/child';
import { Task } from '../../models/task';

@Component({
  selector: 'page-addKidModal',
  templateUrl: 'add-task-modal.html'
})
export class AddTaskModal {
  rootParams: any;
  form;
  childId: string;
  oChild: Child;
  base64Image: string;


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private viewController: ViewController,
    private modalController: ModalController,
    private navParams: NavParams,
  ) {
    this.oChild = navParams.get('child');

    this.form = this.formBuilder.group({
      taskName: ['', Validators.required],

    });

  }

  close() {
    this.viewController.dismiss();
  }


  private generateUUID(): any {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
  }



  processForm() {

    let newtask: Task;
    newtask = {
      taskId: this.generateUUID(),
      childId: this.oChild.childId,
      name: this.form.value.taskName,
      score: 0,
      taskimage: this.base64Image

    };
    if (this.form.status === 'VALID') {
      this.oChild.tasks.push(newtask);
      this.dataService.updateKids()
        .then(() => {
          // let oGAEvent: GAEvent;
          //     oGAEvent = {
          //         category: 'Task',
          //         action: 'AddTask',
          //         label: newtask.name,
          //         value: 0
          //     };
          //     this.gaService.trackEvent(oGAEvent);
          this.close();
        });
    };


  }



}
