import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinHistoricPricePage } from './coin-historic-price';

@NgModule({
  declarations: [
    CoinHistoricPricePage,
  ],
  imports: [
    IonicPageModule.forChild(CoinHistoricPricePage),
  ],
})
export class CoinHistoricPricePageModule {}
