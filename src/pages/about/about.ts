import { Component } from '@angular/core';
import {IonicPage, Item, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    CryptoList;
    CryptoKeys=[];
    origin;
    Ready:any;
    constructor(private http:HttpClient,
                private LoadingC:LoadingController,
                private navC:NavController,
                private navParams:NavParams
      ){

    }


    ionViewDidLoad(){
    this.Refresh()

    }

    Refresh(){
      let Loader = this.LoadingC.create(      {
        spinner: 'hide',
        content: `<div></div>`,
        cssClass:"loading",
        showBackdrop:false
      });

      Loader.present().then(
        ()=>{
          this.http.get<any>("https://www.cryptocompare.com/api/data/coinlist/")
            .toPromise().then(res => {this.CryptoList =res.Data;

                this.CryptoKeys=Object.keys(res.Data); this.CryptoKeys.sort(); this.origin=this.CryptoKeys; this.Ready=true; console.log(this.CryptoList); Loader.dismissAll()},
              error2 =>{Loader.dismiss()})


        }
      )
    }

    ToDetails(Item){
      this.navC.push(CoinAboutComponent,Item,{animation:"ios-transition"}).then();
    }

  getItems(ev){
      this.CryptoKeys=this.origin;
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.CryptoKeys = this.CryptoKeys.filter((item) => {
        return (this.CryptoList[item].FullName.includes(val));
      })
    }
  }
}
@Component({
  selector: 'CoinAbout',
  template: `
    <ion-header no-border>
      <ion-toolbar color="Redish">
        <ion-navbar right>
          <ion-item class="itemTop">
            <ion-avatar item-start>
              <img src="https://www.cryptocompare.com{{Item.ImageUrl}}"/>
            </ion-avatar>
            <ion-title>{{Item.FullName}}</ion-title>
          </ion-item>
        </ion-navbar>

      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-title>{{Item.CoinName}}</ion-card-title>
        <ion-card-content>
          <img src="https://www.cryptocompare.com{{Item.ImageUrl}}">
          <ion-item class="itemTop">
            <ion-icon name="logo-buffer" item-start color="bright"></ion-icon>
            <ion-label>Proof Type : {{Item.ProofType}}</ion-label>
          </ion-item>
          <ion-item class="itemTop"> 
            <ion-icon name="logo-bitcoin" item-start color="bright"></ion-icon>
            <ion-label>Total Coin Supply : {{Item.TotalCoinSupply}} Coins</ion-label>
          </ion-item>
          <ion-item class="itemTop">
            <ion-icon item-start name="md-cash" color="{{Item.Sponsored==true?'danger':'secondary'}}"></ion-icon>
            <ion-label>{{Item.Sponsored==true?'Sponsored':'Not Sponsored'}}</ion-label>
          </ion-item>
        </ion-card-content>
        <button ion-button color="primary" (click)="CoinOverView(Item.Url)" full>Review on CryptoCompare</button>
        <div class="{{!SocialData?'loading':''}}">
          
          <ion-item  (click)="SocialData?GoToLink(SocialData.Facebook.link):null">
            <ion-icon item-start name="logo-facebook" color="Facebook"></ion-icon>
            <h2>
              {{SocialData?SocialData.Facebook.likes:  "N/A"}}  Likes
            </h2>
            <p>{{SocialData?SocialData.Facebook.link  ?'Go to Facebook page':'No page available':'No page available'}}
            </p>
          </ion-item>
          <ion-item (click)="GoToLink(SocialData.Reddit.link)">
            <ion-icon item-start name="logo-reddit" color="Redish">
            </ion-icon>
            <h2>
              {{SocialData?SocialData.Reddit.Points  : 'N/A'}} Points
            </h2>
            <h3>
              {{SocialData?SocialData.Reddit.subscribers   : 'N/A'}} Subscriber
            </h3>
            <p>
              {{SocialData?SocialData.Reddit.link ?'Go to Reddit page':'No page available':'No page available'}}
            </p>
          </ion-item>
          <ion-item  (click)="GoToLink(SocialData.Twitter.link)">
           
            <ion-icon item-start name="logo-twitter" color="primary">
            </ion-icon>
            <h2>
              {{SocialData?SocialData.Twitter.Points  : 'N/A'}} Points
            </h2>
            <h3>
              {{SocialData?SocialData.Twitter.followers  : 'N/A'}} Followers | {{SocialData?SocialData.Twitter.following:'N/A'}} following
            </h3>
            <p>
              {{SocialData?SocialData.Twitter.link ?'Go to Twitter page':'No page available':'No page available'}}
            </p>
          </ion-item>
        </div>
      </ion-card>
      
      
    </ion-content>
  `,
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

export class CoinAboutComponent{
  Item :any;
  SocialData:any;
  constructor(private navC:NavController,
              private navParams:NavParams,
              private http:HttpClient){
    this.Item = navParams.data;
  }

  CoinOverView(url){
    window.open("https://www.cryptocompare.com"+url,'_system');
  }

  ionViewDidLoad(){
    this.getsocialData(this.Item.Id);
  }
  GoToLink(link){
    window.open(link,'_system');
  }
  getsocialData(ID){
    this.http.get<any>("https://www.cryptocompare.com/api/data/socialstats/?id="+ID)
      .subscribe(res=>{
        setTimeout(()=>{
          this.SocialData = res.Data;
        },50)
      })
  }
}

