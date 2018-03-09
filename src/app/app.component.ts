import { Component, HostListener } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ConsoleMsgService } from 'ng-console-msg';

export interface Message {
  body: string;
  createdAt: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  morseText = '';
  messages: Observable<any[]>;

  private keyDownFlg = false;
  private hitInterval;
  private timer = 0;
  private hitStartTime: number;
  private blankStartTime: number;
  private messageCollection: AngularFirestoreCollection<Message>;
  private sound = new Audio('./assets/sound.mp3');

  constructor(
    private db: AngularFirestore,
    private consoleMsgService: ConsoleMsgService
  ) {

    this.consoleMsgService.print({
      body: 'Updateで実務スキルを身につけませんか？',
      link: 'https://update.jp'
    });

    this.messageCollection = db.collection<Message>('messages', ref => ref.orderBy('createdAt'));
    this.messages = this.messageCollection.valueChanges();

    this.hitInterval = setInterval(() => {
      this.timer++;
    }, 100);
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      if (!this.keyDownFlg) {
        this.startMorse();
        this.keyDownFlg = true;
      }
      event.preventDefault();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 13:
        this.sendMessage();
        break;
      case 32:
        this.endMorse();
        this.keyDownFlg = false;
        break;
      case 27:
        this.clearMessage();
        break;
    }
  }

  startMorse() {
    const blankCount = this.timer -  this.blankStartTime;
    this.sound.play();

    if (blankCount > 3) {
      this.morseText += ' ';
    }

    this.hitStartTime = this.timer;
  }

  endMorse() {
    const hitCount = this.timer -  this.hitStartTime;
    this.sound.pause();

    if (hitCount > 1) {
      this.morseText += '-';
    } else {
      this.morseText += '.';
    }

    this.blankStartTime = this.timer;
  }

  sendMessage() {
    if (this.morseText) {
      this.messageCollection.add({
        body: this.morseText,
        createdAt: new Date()
      });
    }

    this.morseText = '';
  }

  clearMessage() {
    this.morseText = '';
  }
}
