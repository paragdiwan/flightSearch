import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { TabComponent } from './tab/tab.component';
import { SliderComponent } from './slider/slider.component';
import { FormComponent } from './form/form.component';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { ResultComponent } from './result/result.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { LayoutComponent } from './layout/layout.component';
import { FlightService } from './flight.service';
import { HttpModule } from '@angular/http';
import { FlightComponent } from './flight/flight.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabComponent,
    SliderComponent,
    FormComponent,
    BreadcrumComponent,
    ResultComponent,
    LeftbarComponent,
    RightbarComponent,
    LayoutComponent,
    FlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
