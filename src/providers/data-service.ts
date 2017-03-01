import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Child } from '../models/child';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { UserData } from './user-data';
import { Task } from '../models/task';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  public currentUser: any;
  public kidzList: any;
  public kidzPhotosRef: any;
  private KIDS_KEY: string = 'kids';

  constructor(public http: Http, public storage: Storage, public userService: UserData, ) {
    console.log('Hello DataService Provider');
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
      if (this.userService.isGuestUser) {
        this.storage.get(this.KIDS_KEY).then((val) => {
          console.log(val);
          this.kidzList = JSON.parse(val);
          resolve(this.kidzList);
        })
      } else {
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
              kidPhoto: snap.val().kidPhoto,
              tasks: snap.val().tasks
            });
          });
          resolve(rawList);
        });
      }

    });
  }

  createKid(data: Child, kidPicture): Promise<any> {
    return new Promise(resolve => {
      if (this.userService.isGuestUser) {
        if (typeof this.kidzList === 'undefined') {
          this.kidzList = [];
        }
        if (this.kidzList === null) {
          this.kidzList = [];
        }
        this.kidzList.push(data);
        this.saveData(this.kidzList, this.KIDS_KEY);
        resolve("Done");
      } else {

        this.kidzList.push({
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
          if (kidPicture != null) {
            this.kidzPhotosRef.child(newKid.key).child('kidPhoto.png')
              .putString(kidPicture, 'base64', { contentType: 'image/png' })
              .then((savedPicture) => {
                this.kidzList.child(newKid.key).child('kidPhoto')
                  .set(savedPicture.downloadURL);
                this.kidzList.child(newKid.key).child('childimage')
                  .set("");
              });
          }
        });
      }
      resolve("Done");
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

  deleteKid(data: Child): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof this.kidzList === 'undefined') {
        this.kidzList = [];
      }
      if (this.userService.isGuestUser) {
        let index = this.kidzList.indexOf(data);
        if (index > -1) {
          this.kidzList.splice(index, 1);
        }
        this.saveData(this.kidzList, this.KIDS_KEY);
      }
      else {
        var adaRef = this.kidzList.child(data.childId);
        adaRef.remove()
          .then(function () {
            console.log("Remove succeeded.")
          })
          .catch(function (error) {
            console.log("Remove failed: " + error.message)
          });
      }
      resolve('Done');
    }).catch((error) => {
      // reject('Only available on a device');
    });
  }

  creatTask(data: Child, taskData: Task, taskPicture): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userService.isGuestUser) {
        data.tasks.push(taskData);
        data.tasksCount += 1;
        this.saveData(this.kidzList, this.KIDS_KEY);
      }
      else {
        var adaRef = this.kidzList.child(data.childId);
        if (taskPicture != null) {
          this.kidzPhotosRef.child(data.childId).child(taskData.taskId)
            .putString(taskPicture, 'base64', { contentType: 'image/png' })
            .then((savedPicture) => {
              taskData.taskPhoto = savedPicture.downloadURL;
              taskData.taskimage = "";
              data.tasks.push(taskData);
              data.tasksCount += 1;
              adaRef.child('tasks').set(data.tasks).then(function () {
                adaRef.child('tasksCount').set(data.tasksCount)
                adaRef.child('tasks').set(data.tasks)
                console.log(" succeeded.")
              })
                .catch(function (error) {
                  console.log(" failed: " + error.message)
                });
            });
        } else {
          data.tasks.push(taskData);
          data.tasksCount += 1;
          adaRef.child('tasks').set(data.tasks).then(function () {
            adaRef.child('tasksCount').set(data.tasksCount)
            adaRef.child('tasks').set(data.tasks)
            console.log(" succeeded.")
          })
            .catch(function (error) {
              console.log(" failed: " + error.message)
            });

        }

      }
      resolve('Done');
    }).catch((error) => {
      //this.logError(error);
      // reject('Only available on a device');
    });
  }


  updateTasks(data: Child): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.userService.isGuestUser) {
        this.saveData(this.kidzList, this.KIDS_KEY);
      }
      else {
        var adaRef = this.kidzList.child(data.childId);
        adaRef.child('tasks').set(data.tasks).then(function () {
          adaRef.child('tasksCount').set(data.tasksCount)
          console.log(" succeeded.")
        })
          .catch(function (error) {
            console.log(" failed: " + error.message)
          });
      }
      resolve('Done');
    }).catch((error) => {
      //this.logError(error);
      // reject('Only available on a device');
    });
  }


  updateKids(): Promise<any> {
    let oKids: any;
    return new Promise((resolve, reject) => {
      if (typeof this.kidzList === 'undefined') {
        this.kidzList = [];
      }
      this.saveData(this.kidzList, this.KIDS_KEY);
      resolve('Done');
    }).catch((error) => {
      //this.logError(error);
      // reject('Only available on a device');
    });
  }

}
