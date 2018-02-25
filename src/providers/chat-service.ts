import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import * as jsf from "jsonfile";
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {query} from "@angular/core/src/animation/dsl";
import {DbServiceProvider} from './db-service/db-service'

export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
    type:string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

@Injectable()
export class ChatService {
    items: any;
    constructor(private http: HttpClient,
                private events: Events,
                public af: AngularFireDatabase,
                private db:DbServiceProvider
                ) {
      this.items = db.GetRefreshedListOfItems('array');
    }

    mockNewMsg(msg) {
        const mockMsg: ChatMessage = {

            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'Hancock',
            userAvatar: './assets/to-user.jpg',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.message,
            status: 'success',
            type:"message"
        };

/*        setTimeout(() => {
            this.events.publish('chat:received', mockMsg, Date.now());
            this.items.push(mockMsg);
            //var items =this.af.list("/");
/!*            jsf.readFile("./assets/mock/msg-list.json",function (err, obj) {
              obj.array.push(mockMsg);
              jsf.writeFile("./assets/mock/msg-list.json", obj, function (err) {

              })
            })*!/
        }, Math.random() * 1800)*/
    }

    getMsgList(): Observable<ChatMessage[]> {
        const msgListUrl = './assets/mock/msg-list.json';
        this.items = this.db.GetRefreshedListOfItems('array');
        //console.log(this.items);
        return this.items;
        /*this.http.get<any>(msgListUrl)
          .pipe(map(response => response.array));*/
    }

    sendMsg(msg: ChatMessage) {
        return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
        .then(() => this.mockNewMsg(msg));
    }

    getUserInfo(): Promise<UserInfo> {
        const userInfo: UserInfo = {
            id: '140000198202211138',
            name: 'Luff',
            avatar: './assets/user.jpg'
        };
        return new Promise(resolve => resolve(userInfo));
    }

}
