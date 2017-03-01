import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {
   public isGuestUser: boolean;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello UserData Provider');
   
  }

  setGuestUser(bGuestUser: boolean): void {
    console.log('Set Your name is', bGuestUser);
    this.storage.set('isGuestUser', bGuestUser);
    this.isGuestUser = bGuestUser;
  }

  getGuestUser(): Promise<boolean> {
    return new Promise(resolve => {
      this.storage.get('isGuestUser').then((val) => {
        console.log('Your name is', val);
        this.isGuestUser = val;
        resolve(val);
      })

    });


  }


}
