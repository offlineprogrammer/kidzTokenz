import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'page-addKidModal',
  templateUrl: 'add-kid-modal.html'
})
export class AddKidModal {
 form: FormGroup;

  constructor(public navCtrl: NavController,private formBuilder: FormBuilder
  ) {

      this.form = this.formBuilder.group({
      kidName: ['', Validators.required],
     
    });

  }

 
  

  

}
