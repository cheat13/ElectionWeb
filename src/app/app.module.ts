import { ComponentsModule } from './../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ChartModule } from 'angular2-chartjs';
import { CloudSyncProvider } from '../providers/cloud-sync/cloud-sync';
import { HttpClient, HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CloudSyncProvider
  ]
})
export class AppModule { }
