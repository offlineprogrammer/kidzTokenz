import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { KidzTokenz } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddKidModal } from '../pages/home/add-kid-modal';
import { DataService } from '../providers/data-service';

@NgModule({
  declarations: [
    KidzTokenz,
    HomePage,
    AddKidModal
  ],
  imports: [
    IonicModule.forRoot(KidzTokenz)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    KidzTokenz,
    HomePage,
    AddKidModal
  ],
  providers: [DataService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
