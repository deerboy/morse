import { Component, HostListener } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Message {
  name: string;
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
  name: string;
  messages: Observable<any[]>;

  private keyDownFlg = false;
  private hitInterval;
  private timer = 0;
  private hitStartTime: number;
  private blankStartTime: number;
  private messageCollection: AngularFirestoreCollection<Message>;

  constructor(private db: AngularFirestore) {

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
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      this.endMorse();
      this.keyDownFlg = false;
    }
  }

  @HostListener('window:keypress', ['$event'])
  keyPressEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  startMorse() {
    const blankCount = this.timer -  this.blankStartTime;

    if (blankCount > 5) {
      this.morseText += ' ';
    }

    this.hitStartTime = this.timer;
  }

  endMorse() {
    const hitCount = this.timer -  this.hitStartTime;

    if (hitCount > 2) {
      this.morseText += '-';
    } else {
      this.morseText += '.';
    }

    this.blankStartTime = this.timer;
  }

  sendMessage() {
    this.messageCollection.add({
      name: this.name || 'no name',
      body: this.morseText,
      createdAt: new Date()
    });

    this.morseText = '';
  }

  clearMessage() {
    this.morseText = '';
  }
}
