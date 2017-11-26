import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../providers/data-service';
import { Child } from '../../models/child';
import { Task } from '../../models/task';
import { Camera } from 'ionic-native/camera';
import { GAService } from '../../providers/ga-service';
import { GAEvent } from '../../models/gaEvent';
@Component({
  selector: 'page-addTaskModal',
  templateUrl: 'add-task-modal.html'
})
export class AddTaskModal {
  rootParams: any;
  form;
  childId: string;
  oChild: Child;
  base64Image: string;
   taskPicture: any;


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private viewController: ViewController,
    private modalController: ModalController,
    private navParams: NavParams,
    private gaService: GAService

  ) {
    this.oChild = navParams.get('child');
    this.gaService.track_page_view('AddTaskModal');

    this.form = this.formBuilder.group({
      taskName: ['', Validators.required],
      negReinforcement: [false, Validators.required],

    });

    this.taskPicture = null;

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
      taskimage: this.base64Image,
      negativeReinforcement: this.form.value.negReinforcement,
      taskPhoto: '',

    };
    if (this.form.status === 'VALID') {
       if (typeof this.oChild.tasks === 'undefined') {
          this.oChild.tasks = [];
        }
      // this.oChild.tasks.push(newtask);
      // this.oChild.tasksCount += 1;
      this.dataService.creatTask(this.oChild, newtask, this.taskPicture)
        .then(() => {
          if (newtask.negativeReinforcement) {
            this.trackEvent('NRTask', 'AddTask', newtask.name, 0);
          } else {
            this.trackEvent('PRTask', 'AddTask', newtask.name, 0);
          }

          this.close();
        });
    };


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


  takePicture() {
    Camera.getPicture({
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.base64Image = 'data:image/png;base64,' + imageData;
      this.trackEvent('Task', 'TakePicture', '', 0);
       this.taskPicture = imageData;

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }



  openGallery(): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      encodingType: Camera.EncodingType.PNG,
      correctOrientation: true
    };

    Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.trackEvent('Task', 'OpenGallery', '', 0);
      this.taskPicture = imageData;
    }, (err) => {
      // Handle error
    });


  }



}
