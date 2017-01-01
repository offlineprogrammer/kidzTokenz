import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Child } from '../models/child';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  Kids: Child[] = [];
  storage: Storage;

  private KIDS_KEY: string = 'kids';

  constructor(public http: Http, storage: Storage) {
    console.log('Hello DataService Provider');
    this.storage = storage;
  }

  getKids(): Promise<Child[]> {
    let oKids: any;
    return new Promise(resolve => {
      if (typeof (this.storage) !== 'undefined') {
        this.storage.get(this.KIDS_KEY).then((value) => {
          if (value) {
            console.log(value);
            this.Kids = JSON.parse(value);
            // this.Kids = oKids;

            resolve(this.Kids);
          }
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
