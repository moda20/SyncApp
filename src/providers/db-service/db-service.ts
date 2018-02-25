import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import {File} from "@ionic-native/file";
import {map} from "rxjs/operators";
import { FilePath } from '@ionic-native/file-path';
import {errorObject} from "rxjs/util/errorObject";
import {LoadingController} from "ionic-angular";
import {AngularFireStorage} from "angularfire2/storage";
import {letProto} from "rxjs/operator/let";
@Injectable()
export class DbServiceProvider {

  constructor(public http: HttpClient,
              private af:AngularFireDatabase,
              private file: File,
              private filepath:FilePath,
              private LoadingC:LoadingController,
              private storage: AngularFireStorage
              ) {

                }


    CreateLoader(){
    let loader = this.LoadingC.create(
      {
        spinner: 'hide',
        content: `<img src="./assets/Loading.gif" />`,
        showBackdrop:false
      }
    );

      return loader;
    }

  /**
   *
   * @param item
   * @param list
   * @return firebase.database.ThenableReference
   */
  PushItemIntoList(item,list){

        return list.push(item);

  }

  /**
   *
   * @param String
   * @return Observable<any[]>
   */
  GetRefreshedListOfItems(String){

        let DBType = localStorage.getItem("dbtype");
        if (DBType == "cache"){
          let List = new Observable( (observer) =>{
            this.file.readAsText(this.file.applicationStorageDirectory,"msg-list.json").then(
              data =>{
                //console.log("dbSER"+JSON.parse(data));
                observer.next(JSON.parse(data));
              }
            );
          });
          //return this.http.get<any>("./assets/mock/msg-list.json").pipe(map(response => response.array));

          return List;
        }else{
          let List = this.af.list(String).valueChanges();

          List.subscribe(
            data=>{
              localStorage.setItem("StoredMessages",JSON.stringify(data));
              this.file.writeFile(this.file.applicationStorageDirectory,"msg-list.json",JSON.stringify(data), {replace: true}).catch(
                  error => {
                    console.log(error);

                  }
                )
                .then(res =>{});
            }
          );
          //this.CreateLoader().dismissAll();
          return List;
        }
  }

  GetListItems(String){

        let List = this.af.list(String);

        return List;


    }

  UpdateAnItemInList(item,key,List){

        return List.update(key, item);

  }

  GetAllCurrencyNames(limitNumber){
    let CN = ["BTC","ETH","DASH","JPY", "CNY", "SDG", "RON", "MKD", "MXN", "CAD",
      "ZAR", "AUD", "NOK", "ILS", "ISK", "SYP", "LYD", "UYU", "YER", "CSD","USD",
      "EEK", "THB", "IDR", "LBP", "AED", "BOB", "QAR", "BHD", "HNL", "HRK",
      "COP", "ALL", "DKK", "MYR", "SEK", "RSD", "BGN", "DOP", "KRW", "LVL",
      "VEF", "CZK", "TND", "KWD", "VND", "JOD", "NZD", "PAB", "CLP", "PEN",
      "GBP", "DZD", "CHF", "RUB", "UAH", "ARS", "SAR", "EGP", "INR", "PYG",
      "TWD", "TRY", "BAM", "OMR", "SGD", "MAD", "BYR", "NIO", "HKD", "LTL",
      "SKK", "GTQ", "BRL", "EUR", "HUF", "IQD", "CRC", "PHP", "SVC", "PLN",
      "XBB", "XBC", "XBD", "UGX", "MOP",
      "SHP", "TTD", "UYI", "KGS", "DJF", "BTN", "XBA", "HTG", "BBD", "XAU",
      "FKP", "MWK", "PGK", "XCD", "COU", "RWF", "NGN", "BSD", "XTS", "TMT",
      "GEL", "VUV", "FJD", "MVR", "AZN", "MNT", "MGA", "WST", "KMF", "GNF",
      "SBD", "BDT", "MMK", "TJS", "CVE", "MDL", "KES", "SRD", "LRD", "MUR",
      "CDF", "BMD", "USN", "CUP", "USS", "GMD", "UZS", "CUC", "ZMK", "NPR",
      "NAD", "LAK", "SZL", "XDR", "BND", "TZS", "MXV", "LSL", "KYD", "LKR",
      "ANG", "PKR", "SLL", "SCR", "GHS", "ERN", "BOV", "GIP", "IRR", "XPT",
      "BWP", "XFU", "CLF", "ETB", "STD", "XXX", "XPD", "AMD", "XPF", "JMD",
      "MRO", "BIF", "CHW", "ZWL", "AWG", "MZN", "CHE", "XOF", "KZT", "BZD",
      "XAG", "KHR", "XAF", "GYD", "AFN", "SOS", "TOP", "AOA", "KPW"]
    if (limitNumber){
      return CN.splice(0,limitNumber);
    }else{
      return CN;
    }
  }


  // File Uploads Related Functions
  /**
   *
   * @param event
   * @return AngularFireUploadTask
   */
  uploadfile(event){
    console.log("will upload");
    const file = event;
    const filePath = event.name;
    let task =this.storage.upload(filePath, file);
    return task;
  }
}
