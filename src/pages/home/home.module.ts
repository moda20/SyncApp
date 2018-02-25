/**
 * Created by hsuanlee on 2017/4/4.
 */
import { NgModule} from '@angular/core';
import {CurrencyModal, HomePage} from './home';
import { IonicPageModule } from 'ionic-angular';
import {RelativeTime} from "../../pipes/relative-time";
import {MyApp} from "../../app/app.component";
import {SharedPipesModule} from "../../pipes/SharedPipesModule";
import {SplashComponent} from "../../components/splash/splash";


@NgModule({
    declarations: [HomePage,CurrencyModal,SplashComponent],
    imports: [
        IonicPageModule.forChild(HomePage),
        SharedPipesModule,

    ],
  exports: [CurrencyModal],

})
export class HomePageModule { }
