import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../providers/data-service';
import { Child } from '../../models/child';
import { TokentypePage } from '../tokentype/tokentype';
import { TokennumbersPage } from '../tokennumbers/tokennumbers';
import { Camera } from 'ionic-native';
import { GAService } from '../../providers/ga-service';
import { GAEvent } from '../../models/gaEvent';


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
    private modalController: ModalController,
    private gaService: GAService
  ) {
    this.gaService.track_page_view('CreatKidModal');
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
      kidPhoto: '',
      tasks: []
    };
    if (this.form.status === 'VALID') {
      this.dataService.createKid(newkid, this.kidPicture)
        .then(() => {
          /*       this.dataService.updateKids();*/
          this.trackEvent('Child', 'AddChild', newkid.tokenType, newkid.tokenNumbers);
          console.log("done");
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
      this.kidPicture = imageData;
      this.trackEvent('Child', 'TakePicture', '', 0);

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
      this.kidPicture = imageData;
      this.trackEvent('Child', 'OpenGallery', '', 0);
    }, (err) => {      // Handle error
    });
  }

}
