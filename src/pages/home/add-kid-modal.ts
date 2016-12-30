import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../providers/data-service';
import { Child } from '../../models/child';

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


  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private viewController: ViewController
  ) {

    this.form = this.formBuilder.group({
      kidName: ['', Validators.required],

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

    let newkid: Child;
    newkid = {
      childId: this.generateUUID(),
      name: this.form.value.kidName,
      tokenType: this.tokenType,
      tokenNumbers: this.tokenNumbers,
      srcTokenNumbers: 'images/' + this.tokenNumbers + '.png',
      isActive: true,
      childimage: this.base64Image,
      tasks: []

    };
    if (this.form.status === 'VALID') {
      this.dataService.addKid(newkid)
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




}
