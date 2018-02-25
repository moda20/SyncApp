import {Component, enableProdMode} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {File} from "@ionic-native/file";

@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage:any = 'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private file:File) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      localStorage.setItem("dbtype","no-cache");
      this.file.copyFile(this.file.applicationDirectory + '/www/assets/mock', 'msg-list.json', this.file.applicationStorageDirectory, 'msg-list.json');

    });
  }

}
