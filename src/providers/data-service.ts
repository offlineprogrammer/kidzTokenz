import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Child } from '../models/child';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { UserData } from './user-data';

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
  public kidzPhotosRef: any;

  private KIDS_KEY: string = 'kids';

  constructor(public http: Http, storage: Storage, public userService: UserData, ) {
    console.log('Hello DataService Provider');
    this.storage = storage;
    if (this.userService.isGuestUser) {

    } else {
      this.currentUser = firebase.auth().currentUser.uid;
      this.kidzList = firebase.database()
        .ref(`userProfile/${this.currentUser}/kidz`);
      this.kidzPhotosRef = firebase.storage().ref('/kidzPhotos/');

    }


  }


  getKidsList(): any {
    return this.kidzList;
  }


  getKids(): Promise<Child[]> {
    let oKids: any;
    return new Promise(resolve => {

      this.kidzList.on('value', snapshot => {
        let rawList = [];
        snapshot.forEach(snap => {
          rawList.push({
            childId: snap.key,
            name: snap.val().name,
            tokenType: snap.val().tokenType,
            negativetokenType: snap.val().negativetokenType,
            tokenNumbers: snap.val().tokenNumbers,
            srcTokenNumbers: snap.val().srcTokenNumbers,
            isActive: snap.val().isActive,
            childimage: snap.val().childimage,
            tasksCount: snap.val().tasksCount,
            kidPhoto: snap.val().kidPhoto


          });
        });
        resolve(rawList);
        //  this.kids = rawList;
      });

    });
  }




  createKid(data: Child, kidPicture): any {
    return this.kidzList.push({
      childimage: data.childimage,
      name: data.name,
      tokenType: data.tokenType,
      negativetokenType: data.negativetokenType,
      tokenNumbers: data.tokenNumbers,
      srcTokenNumbers: data.srcTokenNumbers,
      isActive: data.isActive,
      tasksCount: data.tasksCount
    }).then(newKid => {
      this.kidzList.child(newKid.key).child('childId').set(newKid.key);
      if (data.childimage != null) {
        this.kidzPhotosRef.child(newKid.key).child('kidPhoto.png')
          .putString(kidPicture, 'base64', { contentType: 'image/png' })
          .then((savedPicture) => {
            this.kidzList.child(newKid.key).child('kidPhoto')
              .set(savedPicture.downloadURL);
          });
      }
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

  updateKids(): Promise<any> {
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
