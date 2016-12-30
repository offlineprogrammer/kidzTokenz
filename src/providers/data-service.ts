import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Child } from '../models/child';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
   Kids: Child[] = [];

  constructor(public http: Http) {
    console.log('Hello DataService Provider');
  }

  getKids(): Promise<Child[]> {
    let oKids: any;
    return new Promise(resolve => {
      /*      if (typeof (this.storage) !== 'undefined') {
              this.storage.get(this.KIDS_KEY).then((value) => {
                if (value) {
                  console.log(value);
                  this.Kids = JSON.parse(value);
                  // this.Kids = oKids;
      
                  resolve(this.Kids);
                }
              });
      
            }*/
    });
  }

  addKid(data: Child): Promise<any> {
    let oKids: any;
    return new Promise((resolve, reject) => {
      if (typeof this.Kids === 'undefined') {
        this.Kids = [];

      }
      this.Kids.push(data);
      //this.saveData(this.Kids, this.KIDS_KEY);
      resolve('Done');

    }).catch((error) => {
      // reject('Only available on a device');
    });
  }

}
