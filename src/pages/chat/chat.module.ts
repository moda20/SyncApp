import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat } from './chat';
import {ChatService} from "../../providers/chat-service";
import {EmojiPickerComponentModule} from "../../components/emoji-picker/emoji-picker.module";
import {EmojiProvider} from "../../providers/emoji";
import {RelativeTime} from "../../pipes/relative-time";
import {SharedPipesModule} from "../../pipes/SharedPipesModule";

@NgModule({
  declarations: [
    Chat,
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(Chat),
    SharedPipesModule
  ],
  exports: [
    Chat
  ],
  providers:[
    ChatService,
    EmojiProvider,

  ]
})
export class ChatModule {}
