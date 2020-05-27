import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TimerComponent } from './lottery-component/timer.component';
import { LotteryComponent } from './lottery-component/lottery.component';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    LotteryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
