import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { KidzTokenz } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddKidModal } from '../pages/home/add-kid-modal';
import { ChildinfoPage } from '../pages/childinfo/childinfo';
import { AddTaskModal } from '../pages/childinfo/add-task-modal';
import { TokentypePage } from '../pages/tokentype/tokentype';
import { TokennumbersPage } from '../pages/tokennumbers/tokennumbers';
import { TaskInfoPage } from '../pages/task-info/task-info';
import { DataService } from '../providers/data-service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    KidzTokenz,
    HomePage,
    AddKidModal,
    ChildinfoPage,
    TokentypePage,
    TokennumbersPage,
    TaskInfoPage,
    AddTaskModal
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
    TokennumbersPage,
    TaskInfoPage,
    AddTaskModal
  ],
  providers: [Storage,DataService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
