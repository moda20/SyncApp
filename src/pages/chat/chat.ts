import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavParams, ToastController} from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { AngularFireDatabase } from 'angularfire2/database';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {Clipboard} from "@ionic-native/clipboard";
import {DbServiceProvider} from '../../providers/db-service/db-service'
import {Observable} from "rxjs/Observable";
import { Toast } from '@ionic-native/toast';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
declare var cordova;

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
  editorMsg = '';
    showEmojiPicker = false;
    items: any;
    source:any;
  gettingMessages=false;
    filupload =[{}];
    constructor(navParams: NavParams,
                private chatService: ChatService,
                private events: Events,
                public af: AngularFireDatabase,
                private iab: InAppBrowser,
                private clipboard: Clipboard,
                private Toast:ToastController,
                private db:DbServiceProvider,
                private toast: Toast,
                private nativePageTransitions:NativePageTransitions) {
        // Get the navParams toUserId parameter
      this.source = localStorage.getItem("dbtype");
      this.items = this.db.GetListItems('array');

        this.toUser = {
            id: navParams.get('toUserId'),
            name: navParams.get('toUserName')
        };
        // Get mock user information
        this.chatService.getUserInfo()
        .then((res) => {
            this.user = res
        });
    }

    UpdateList(){
      //this.source = localStorage.getItem("dbtype");

      if (localStorage.getItem("dbtype")=="cache"){
        localStorage.setItem("dbtype","no-cache");
        this.source = localStorage.getItem("dbtype");
      }else {
        localStorage.setItem("dbtype","cache");
        this.source = localStorage.getItem("dbtype");
      }
      this.getMsg();

    }

    ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
      let options: NativeTransitionOptions = {
        direction: 'right',
        duration: 190,
        slowdownfactor: 1,
        slidePixels: 0,
        iosdelay: 100,
        androiddelay: 50,
        fixedPixelsTop: 0,
        fixedPixelsBottom: 0
      };
      this.nativePageTransitions.slide(options)
        .then(dt=>{console.log(dt)})
        .catch(err=>{console.log(err)});
    }

    ionViewDidEnter() {
        //get message list
        this.getMsg();

        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {

            this.pushNewMsg(msg);
        })
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    private getMsg() {
        // Get mock message list
      this.gettingMessages=true;
      this.msgList =[];
        return this.chatService
        .getMsgList()
        .subscribe(res => {
            this.msgList = res;
          this.gettingMessages=false;
            this.scrollToBottom();
        });
    }

    /**
     * @name sendMsg
     */
    sendMsg() {
        if (!this.editorMsg.trim()) return;

        // Mock message
        const id = Date.now().toString();
        let newMsg: ChatMessage = {

            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending',
            type:"message"
        };

        let R =this.db.PushItemIntoList(newMsg,this.items).then(
          data => {
            newMsg["key"]=data.key;

            this.editorMsg = '';

            if (!this.showEmojiPicker) {
              this.messageInput.setFocus();
            }

            this.chatService.sendMsg(newMsg)
              .then(() => {
                let index = this.getMsgIndexById(id);
                if (index !== -1) {
                  newMsg.status = 'success';
                  console.log(newMsg);
                  this.db.UpdateAnItemInList(newMsg,newMsg["key"],this.items).then(
                    data=>{
                      //this.pushNewMsg(newMsg);
                    }
                  );
                }
              })
          }
        );


    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {

          const userId = this.user.id,
            toUserId = this.toUser.id;
          // Verify user relationships
          if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
          } else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
          }

          this.scrollToBottom();

    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }
    OpenLink(link,msg){
      if (msg.type =="message"){
        const browser = this.iab.create(link);
        browser.show();
      }


    }
  tapEvent(Text){
    this.clipboard.copy(Text).then(
      data=>{
        console.log(data)
/*        this.toast.show("TextCopied to clipboard", '1100', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );*/
/*console.log(cordova.plugins);*/
        cordova.plugins.snackbar.create("TextCopied to clipboard", 'SHORT');
      }
    );
/*    let toas =this.Toast.create({
      message:"TextCopied to clipboard",
      duration:1100
    });
    toas.present().then();*/


  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)

  }

  uploadfile(event){
      console.log(event.target.files[0]);

      let task =this.db.uploadfile(event.target.files[0]);
      let X ={
        Percentage :task.percentageChanges(),
        DownloadUrl:task.downloadURL()
      }
          this.filupload.push(X);
          X["index"]=this.filupload.length-1;
          this.filupload[this.filupload.length-1]["index"]=this.filupload.length-1;
          const id = Date.now().toString();
          let newMsg: ChatMessage = {

            messageId: id,
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: "Uploading : "+event.target.files[0].name,
            status: 'pending',
            type:"file"
          };


    let R =this.db.PushItemIntoList(newMsg,this.items).then(
      data => {

        newMsg["key"]=data.key;

        this.editorMsg = '';

        if (!this.showEmojiPicker) {
          this.messageInput.setFocus();
        }

        this.chatService.sendMsg(newMsg)
          .then(() => {
            let index = this.getMsgIndexById(id);
            if (index !== -1) {
              this.filupload[X["index"]]['Percentage'].subscribe(
                res =>{
                  console.log(res);
                  if (res == 100){
                    this.filupload[X["index"]]['DownloadUrl'].subscribe(
                      url=>{
                        var finalId = Date.now().toString();
                        let finalMsg: ChatMessage = {

                          messageId: finalId,
                          userId: this.user.id,
                          userName: this.user.name,
                          userAvatar: this.user.avatar,
                          toUserId: this.toUser.id,
                          time: Date.now(),
                          message: url,
                          status: 'success',
                          type:"message"
                        };

                        finalMsg["key"]=data.key;
                        finalMsg.status = 'success';
                        console.log(finalMsg);
                        this.db.UpdateAnItemInList(finalMsg,finalMsg["key"],this.items).then(
                          data=>{
                            //this.pushNewMsg(newMsg);
                          }
                        );
                      }
                    )
                  }


                }

              )

            }
          })
      }
    );

  }
}
