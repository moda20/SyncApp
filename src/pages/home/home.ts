import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, ModalController} from 'ionic-angular';
import * as BTCC from 'btc-china'
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {DbServiceProvider} from "../../providers/db-service/db-service";
import {animate, state, style, transition, trigger} from "@angular/animations";
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        opacity:1

      })),
      state('out', style({
        transition: 'opacity',
        opacity:0

      })),
      transition('in => out', animate('800ms ease')),
      transition('out => in', animate('800ms ease'))
    ]),
  ]
})
export class HomePage {
  @ViewChild(Content) content: Content;
  toUser : {toUserId: string, toUserName: string};
  BTCValue :any;
  SpinnerStatus :any;
  splash = true;
  BTCLINK : "https://spotusd-data.btcc.com/data/pro/ticker?symbol=BTCUSD";
  Animations ={btcvalue :false};
  tabBarElement: any;
  constructor(private http:HttpClient,
              private modalC:ModalController,
              private LoadingC:LoadingController
              ) {




    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
   // this.tabBarElement = document.querySelector('.tabbar');

  }


  // Refreshes the value of BTC -> USD
  RefreshBTC(){
    this.SpinnerStatus = null;
    this.http.get<any>("https://spotusd-data.btcc.com/data/pro/ticker?symbol=BTCUSD")
      .subscribe(res => {this.BTCValue = res ; this.SpinnerStatus = true }) ;
  }

  CompareCurrencies(){
    let modal = this.modalC.create(CurrencyModal);
    modal.present();
  }

  ionViewDidLoad(){
    this.http.get<any>("https://spotusd-data.btcc.com/data/pro/ticker?symbol=BTCUSD")
      .subscribe(res =>{
          setTimeout(()=>{
            this.BTCValue = res;
            this.SpinnerStatus = true;
            this.Animations.btcvalue=true;
          },2500);
      } );
  }


}

@Component({
  selector:"compare-curr",
  template: `
      <ion-content no-padding>
        <ion-grid >
          <ion-row>
            <ion-col col-6>
              <ion-list no-lines no-padding no-margin >
                <ion-list-header >Compare</ion-list-header>
                <ion-item *ngFor="let Curr of CryptoList">
                  <ion-label>{{Curr}}</ion-label>
                  <ion-checkbox  (ionChange)="ToogleCompare(Curr)"></ion-checkbox>
                </ion-item>
              </ion-list>
            </ion-col>
            <ion-col col-6>
              <ion-list no-lines no-padding no-margin>
                <ion-list-header>With</ion-list-header>
                <ion-item *ngFor="let Curr of CurrList">
                  <ion-label>{{Curr}}</ion-label>
                  <ion-checkbox [checked]="" (ionChange)="ToogleTo(Curr)"></ion-checkbox>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-list *ngIf="Results" no-padding no-margin>
          <div *ngFor="let key of Results.Keys">
            <ion-list-header>{{key}} :</ion-list-header>
            <ion-item no-margin margin-left *ngFor="let vl of Results[key].Keys">
              <ion-label>
                {{vl}} => {{Results[key][vl]}}
              </ion-label>
            </ion-item>
          </div>
          
        </ion-list>
       
      </ion-content>
    <ion-footer>
      <button ion-button full color="Primary" (click)="DoCompare()">Compare</button>
    </ion-footer>
`
})

export class CurrencyModal{
  @ViewChild(Content) content: Content;
  CurrList:any;
  CryptoList=["BTC","ETH","DASH"]
  Limit:20;
  CompareList=[];
  ToList=[];
  Results:any;
  constructor(private db:DbServiceProvider,
              private http:HttpClient,
              private LoadingC:LoadingController
              ){
    this.CurrList=db.GetAllCurrencyNames(20);
  }

  ToogleCompare(curr){
    if (this.CompareList.indexOf(curr)<0){
      this.CompareList.push(curr);
    }else{
      this.CompareList.splice(this.CompareList.indexOf(curr),1);
    }
  }
  ToogleTo(curr){
    if (this.ToList.indexOf(curr)<0){
      this.ToList.push(curr);
    }else{
      this.ToList.splice(this.ToList.indexOf(curr),1);
    }
  }
  DoCompare(){
    let loader = this.LoadingC.create(
      {
        spinner: 'hide',
        content: `<img src="./assets/MELOADERl.gif" />`,
        showBackdrop:false
      }
    );
    loader.present().then(()=>{
      this.http.get<any>("https://min-api.cryptocompare.com/data/pricemulti?fsyms="+this.CompareList.toString()+"&tsyms="+this.ToList.toString())
        .subscribe(res=>{
          if (res["Response"]!="Error"){
            this.Results=res ;
            console.log(this.Results);
            this.Results["Keys"]= Object.keys(this.Results) ;
            for(let X of this.Results["Keys"]){
              this.Results[X]["Keys"]=Object.keys(this.Results[X]);
            }

            try{
              this.scrollToBottom();
            }catch (e){
              console.log(e);
            }
            loader.dismissAll();
          }else{
            console.log("error");
            loader.dismissAll();
          }
        })
    })

  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }


}
