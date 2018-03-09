import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { MorsePipe } from './morse.pipe';

import { ConsoleMsgService } from 'ng-console-msg';

@NgModule({
  declarations: [
    AppComponent,
    MorsePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [ConsoleMsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
