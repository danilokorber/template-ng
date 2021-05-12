import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ZorroModule } from '@modules/zorro/zorro.module';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

import { RootLayout } from '../layouts/root.component';

@NgModule({
  declarations: [RootLayout],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ZorroModule,
    NgxGoogleAnalyticsModule.forRoot('tracking-code'),
    NgxGoogleAnalyticsRouterModule,
  ],
  providers: [],
  bootstrap: [RootLayout],
})
export class AppModule {}
