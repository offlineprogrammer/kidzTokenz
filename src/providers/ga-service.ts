import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GoogleAnalytics } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { GAEvent } from '../models/gaEvent';
import { GAException } from '../models/gaException';
/*
  Generated class for the GAService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GAService {
  initialized: boolean;
  platform: any;


  constructor(public http: Http, private _platform: Platform) {
    console.log('Hello GAService Provider');
    this.platform = _platform;
    this.initialized = false;
    this.platform.ready().then(() => {

      console.log("GoogleAnalytics service platform ready");

    });

  }


  track_page_view(page_name) {
    this.platform.ready().then(() => {

      console.log("GoogleAnalytics is initialized? " + this.initialized);

      if (this.platform.is("ios") || this.platform.is("android")) {
        //mobile

        var platform = "";

        if (this.platform.is("ios")) {
          platform = "ios";
        }
        else {
          platform = "android";
        }

        //GoogleAnalytics.debugMode();

        if (!this.initialized) {
          console.log("1GoogleAnalytics is initialized? " + this.initialized);

          GoogleAnalytics.debugMode();

          GoogleAnalytics.startTrackerWithId("UA-70035565-3").then((_result) => {

            this.initialized = true;

            console.log("GoogleAnalytics initialized for mobile: UA-xxx-13");
            console.log("GoogleAnalytics result: " + _result);

            GoogleAnalytics.enableUncaughtExceptionReporting(true)
              .then((_success) => {
                console.log("GoogleAnalytics success: " + _success);
              }).catch((_error) => {
                console.log("GoogleAnalytics error: " + _error);
              });
            GoogleAnalytics.trackView(page_name).then((_success) => {
              console.log("GoogleAnalytics: Tracked view for mobile: " + page_name + "_" + platform);
            }).catch((_error) => {
              console.log("GoogleAnalytics error tracking view: " + _error);
            });

          });

        }
        else {

          console.log("GoogleAnalytics: Starting Tracking page view: " + page_name + "_" + platform);

          GoogleAnalytics.trackView(page_name).then((_success) => {
            console.log("GoogleAnalytics: Tracked view for mobile: " + page_name + "_" + platform);
          }).catch((_error) => {
            console.log("GoogleAnalytics error tracking view: " + _error);
          });
        }
      }
      else {
        // web
        console.log("GoogleAnalytics: Tracked pageview for web: " + page_name);
      }

    });
  }

  trackException(data: GAException): any {
    this.platform.ready().then(() => {
      GoogleAnalytics.trackException(data.description, data.isFatal);
    });
  }


  trackEvent(data: GAEvent): any {
    this.platform.ready().then(() => {
      GoogleAnalytics.trackEvent(data.category, data.action, data.label, data.value);
    });
  }

  setUserType(bGuestUser: boolean): any {
    this.platform.ready().then(() => {
      if (bGuestUser){
        GoogleAnalytics.addCustomDimension(1, "GuestUser");

      } else {
        GoogleAnalytics.addCustomDimension(1, "RegisteredUser");

      }

      
    });
  }


}
