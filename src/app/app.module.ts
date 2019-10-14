import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyD3rkOsURcKtR0ic6mVRrmuE6575FjZ-bw",
  authDomain: "mimi-865e4.firebaseapp.com",
  databaseURL: "https://mimi-865e4.firebaseio.com",
  projectId: "mimi-865e4",
  storageBucket: "mimi-865e4.appspot.com",
  messagingSenderId: "259837838839",
  appId: "1:259837838839:web:08395161cf674994ae5af2",
  measurementId: "G-2YT6K8Q8YE"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen, FormsModule, ReactiveFormsModule ,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
