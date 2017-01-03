import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { KidzTokenz } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddKidModal } from '../pages/home/add-kid-modal';
import { ChildinfoPage } from '../pages/childinfo/childinfo';
import { TokentypePage } from '../pages/tokentype/tokentype';
import { TokennumbersPage } from '../pages/tokennumbers/tokennumbers';
import { DataService } from '../providers/data-service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    KidzTokenz,
    HomePage,
    AddKidModal,
    ChildinfoPage,
    TokentypePage,
    TokennumbersPage
  ],
  imports: [
    IonicModule.forRoot(KidzTokenz)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    KidzTokenz,
    HomePage,
    AddKidModal,
    ChildinfoPage,
    TokentypePage,
    TokennumbersPage
  ],
  providers: [Storage,DataService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
