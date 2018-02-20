import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  private hitInterval;
  private timer = 0;
  private hitStartTime: number;
  private blankStartTime: number;

  morseText = '';

  messages = [
    {
      name: 'taro',
      message: 'yamada'
    },
    {
      name: 'taro',
      message: 'yamada'
    },
  ];

  constructor() {
    this.hitInterval = setInterval(() => {
      this.timer++;
    }, 100);
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
}
