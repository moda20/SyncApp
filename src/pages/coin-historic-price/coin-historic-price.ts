import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { HTTP } from '@ionic-native/http';
import * as moment from 'moment';
/**
 * Generated class for the CoinHistoricPricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin-historic-price',
  templateUrl: 'coin-historic-price.html',
})
export class CoinHistoricPricePage {
  Coin = {};
  barChart: any;
  coindDeskBitCoinPriceURL="https://www.coindesk.com/price/";
  @ViewChild('PriceCanvas') PriceCanvas;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinHistoricPricePage');

    this.http.get('https://api.coindesk.com/v1/bpi/historical/close.json', {}, {}).then(
      data => {
        console.log(data);
        let value = JSON.parse(data.data)["bpi"];
        let result = [];
        let keys=[];
        for(let key of Object.keys(value)){
          result.push(value[key]);
          keys.push(moment(key).date());
        }


        console.log(result);
        this.barChart = new Chart(this.PriceCanvas.nativeElement, {

          type: 'line',
          data:{
            labels: keys,
            datasets: [
              {
                label: "Bitcoin Price",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: result
              },
              /*{
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
              }*/
            ]
          }

        });
      }
    )
  }

  GotoCoindesk(){

  }

}


