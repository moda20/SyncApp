import {NgModule, ErrorHandler, enableProdMode} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmojiProvider } from '../providers/emoji';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from 'angularfire2';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// New imports to update based on AngularFire2 version 4
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {Clipboard} from "@ionic-native/clipboard";
import { DbServiceProvider } from '../providers/db-service/db-service';
import {FileSystem} from "@ionic-native/file";
import { FilePath } from '@ionic-native/file-path';
import {HttpModule} from "@angular/http";
import {RelativeTime} from "../pipes/relative-time";
import {CurrencyModal} from "../pages/home/home";
import {HomePageModule} from "../pages/home/home.module";
import {ChatModule} from "../pages/chat/chat.module";
import {AboutPageModule} from "../pages/about/about.module";
import {CoinAboutComponent} from "../pages/about/about";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Toast} from "@ionic-native/toast";
import { NativePageTransitions} from '@ionic-native/native-page-transitions';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { Dialogs } from '@ionic-native/dialogs';
import { HTTP } from '@ionic-native/http';
import {CoinHistoricPricePageModule} from "../pages/coin-historic-price/coin-historic-price.module";
export const firebaseConfig = {
  apiKey: "AIzaSyByhmYwwAFlmKoEB8OBVoUeLh3hQOJ3rfk",
  authDomain: "syncapp-a4591.firebaseapp.com",
  databaseURL: "https://syncapp-a4591.firebaseio.com/",
  storageBucket: "gs://syncapp-a4591.appspot.com/",
  messagingSenderId: "10931153584"
};

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
      tabsLayout:'icon-left',
      preloadModules: true
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HomePageModule,
    ChatModule,
    AboutPageModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    CoinHistoricPricePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CurrencyModal,
    CoinAboutComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmojiProvider,
    InAppBrowser,
    Clipboard,
    DbServiceProvider,
    File,
    FilePath,
    Toast,
    NativePageTransitions,
    BackgroundMode,
    BackgroundGeolocation,
    Dialogs,
    HTTP

]
})

export class AppModule {

}
