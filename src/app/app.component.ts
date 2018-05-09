import {Component, enableProdMode} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {File} from "@ionic-native/file";
import { BackgroundMode } from '@ionic-native/background-mode';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Dialogs } from '@ionic-native/dialogs';
@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage:any = 'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private file:File,
              private backgroundMode: BackgroundMode,private backgroundGeolocation: BackgroundGeolocation,
              private dialogs: Dialogs) {
    platform.ready().then(() => {

      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: false, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };
      this.backgroundGeolocation.configure(config)
        .subscribe((location: BackgroundGeolocationResponse) => {

          console.log(location);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.isLocationEnabled().then(
            data=>{
              if(data==0){
                this.dialogs.alert("Location Services are not enabled, We use location to serve a better experience to you. Please consider enabling and " +
                  "giving permission to our app to use it",'Platform warning','Dismiss')
                  .then(() => console.log('Dialog dismissed'))
                  .catch(e => console.log('Error displaying dialog', e));
              }else{
                this.backgroundGeolocation.start();
              }
            }
          )
         /* this.backgroundGeolocation.stop();*/
        });
      statusBar.backgroundColorByHexString("#980808");
      splashScreen.hide();
      localStorage.setItem("dbtype","no-cache");
      this.backgroundMode.enable();
      this.file.copyFile(this.file.applicationDirectory + '/www/assets/mock', 'msg-list.json', this.file.applicationStorageDirectory, 'msg-list.json');

    });
  }

}
