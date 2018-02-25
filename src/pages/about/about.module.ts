/**
 * Created by hsuanlee on 2017/4/4.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AboutPage, CoinAboutComponent} from './about';

@NgModule({
    declarations: [
        AboutPage,
      CoinAboutComponent
    ],
    imports: [
        IonicPageModule.forChild(AboutPage),
    ],
    exports: [
        AboutPage
    ]
})
export class AboutPageModule {}
