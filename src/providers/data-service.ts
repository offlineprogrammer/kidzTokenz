import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Child } from '../models/child';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  public currentUser: any;
  Kids: Child[] = [];
  storage: Storage;
  public kidzList: any;

  private KIDS_KEY: string = 'kids';

  constructor(public http: Http, storage: Storage) {
    console.log('Hello DataService Provider');
    this.storage = storage;
    this.currentUser = firebase.auth().currentUser.uid;
    this.kidzList = firebase.database()
        .ref(`userProfile/${this.currentUser}/kidz`);
  }

  getKids(): Promise<Child[]> {
    let oKids: any;
    return new Promise(resolve => {
     
      resolve(this.kidzList);

    });
  }

  createKid(data: Child): any {
  return this.kidzList.push({
     childimage: data.childimage,
    name: data.name,
    tokenType: data.tokenType,
    negativetokenType: data.negativetokenType,
    tokenNumbers: data.tokenNumbers,
    srcTokenNumbers: data.srcTokenNumbers,    
    isActive: data.isActive
  }).then( newKid => {
    this.kidzList.child(newKid.key).child('childId').set(newKid.key);
  });
}


  addKid(data: Child): Promise<any> {
    let oKids: any;
    return new Promise((resolve, reject) => {
      if (typeof this.Kids === 'undefined') {
        this.Kids = [];

      }
      this.Kids.push(data);
      this.saveData(this.Kids, this.KIDS_KEY);
      resolve('Done');

    }).catch((error) => {
      // reject('Only available on a device');
    });
  }

  private saveData(data: any, key: string) {
    if (data) {
      let newData = JSON.stringify(data);

      this.storage.set(key, newData);
    } else {
      this.storage.remove(key);
    }
  }

  getTokenTypes(): string[] {
    let tokenTypes: any =
      ['assets/images/star.png',
        'assets/images/face.png',
        'assets/images/giraffe.png',
        'assets/images/leopard.png',
        'assets/images/monkey.png',
        'assets/images/monkeytoy.png',
        'assets/images/rocket.png',
        'assets/images/Sheep.png',
        'assets/images/teddybear.png',
        'assets/images/train.png',
        'assets/images/triceratops.png',
      ];
    return tokenTypes;

  }

    updateKids(): Promise < any > {
        let oKids: any;
        return new Promise((resolve, reject) => {
            if (typeof this.Kids === 'undefined') {
                this.Kids = [];

            }

            this.saveData(this.Kids, this.KIDS_KEY);
            resolve('Done');

        }).catch((error) => {
            //this.logError(error);
            // reject('Only available on a device');
        });
    }

}
