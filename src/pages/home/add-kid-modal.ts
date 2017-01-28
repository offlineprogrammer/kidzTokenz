import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../providers/data-service';
import { Child } from '../../models/child';
import { TokentypePage } from '../tokentype/tokentype';
import { TokennumbersPage } from '../tokennumbers/tokennumbers';
import { Camera } from 'ionic-native';


@Component({
  selector: 'page-addKidModal',
  templateUrl: 'add-kid-modal.html'
})
export class AddKidModal {
  form: FormGroup;
  tokenType: string = 'assets/images/star.png';
  srcTokenNumbers: string = 'assets/images/5.png';
  tokenNumbers: number = 5;
  base64Image: string;
  kidPicture: any;


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private viewController: ViewController,
    private modalController: ModalController
  ) {

    this.form = this.formBuilder.group({
      kidName: ['', Validators.required],

    });
    this.kidPicture = null;

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

  selectToken() {
    let modal = this.modalController.create(TokentypePage, { selectedToken: this.tokenType });
    modal.onDidDismiss(data => {
      this.tokenType = data.selectedToken;
    });

    modal.present();
  }


  selectTokenNumbers() {
    let modal = this.modalController.create(TokennumbersPage, { tokenNumbers: this.srcTokenNumbers });
    modal.onDidDismiss(data => {
      this.tokenNumbers = data.tokenNumbers;
      this.srcTokenNumbers = 'assets/images/' + this.tokenNumbers + '.png';
    });

    modal.present();
  }



  processForm() {

    let newkid: Child;
    newkid = {
      childId: this.generateUUID(),
      name: this.form.value.kidName,
      tokenType: this.tokenType,
      negativetokenType: this.tokenType.replace('assets/images/', 'assets/images/bad-'),
      tokenNumbers: this.tokenNumbers,
      srcTokenNumbers: 'assets/images/' + this.tokenNumbers + '.png',
      isActive: true,
      childimage: this.base64Image,
      tasksCount: 0,
      tasks: []

    };
    if (this.form.status === 'VALID') {
      this.dataService.createKid(newkid)
        .then(() => {
          /*       this.dataService.updateKids();
                 let oGAEvent: GAEvent;
                 oGAEvent = {
                   category: 'Child',
                   action: 'AddChild',
                   label: newkid.tokenType,
                   value: newkid.tokenNumbers,
                 };
                 this.gaService.trackEvent(oGAEvent);*/
          this.close();
        });
    };
  }

  takePhoto() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }


  openGallery(): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    };

    Camera.getPicture(cameraOptions)
      .then(file_uri => this.base64Image = file_uri,
      err => console.log(err));
  }

}
