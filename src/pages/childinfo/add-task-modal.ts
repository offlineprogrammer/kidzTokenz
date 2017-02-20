import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../providers/data-service';
import { Child } from '../../models/child';
import { Task } from '../../models/task';
import { Camera } from 'ionic-native';

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
       negReinforcement: [false, Validators.required],

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
      taskimage: this.base64Image,
      negativeReinforcement: this.form.value.negReinforcement

    };
    if (this.form.status === 'VALID') {
      this.oChild.tasks.push(newtask);
      this.oChild.tasksCount+=1; 
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
     // this.kidPicture = imageData;

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
    //  this.kidPicture = imageData;
    }, (err) => {
      // Handle error
    });


  }



}
