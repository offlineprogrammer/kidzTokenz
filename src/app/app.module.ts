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
import { GAService } from '../providers/ga-service';
import { AuthData } from '../providers/auth-data';
import { StorageData } from '../providers/storage-data';
import { UserData } from '../providers/user-data';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { AppInfoPage } from '../pages/app-info/app-info';

export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' })// optional config);
}


@NgModule({
  declarations: [
    KidzTokenz,
    HomePage,
    AddKidModal,
    ChildinfoPage,
    TokentypePage,
    TokennumbersPage,
    TaskInfoPage,
    AddTaskModal,
    LoginPage,
    AppInfoPage
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
    AddTaskModal,
    LoginPage,
    AppInfoPage
  ],
  providers: [Storage,DataService,GAService,AuthData,UserData,StorageData,{provide: ErrorHandler, useClass: IonicErrorHandler,useFactory: provideStorage}]
})
export class AppModule {}
