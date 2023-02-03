import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { SecondButtonComponent } from './second-button/second-button.component';
import { ThirdButtonComponent } from './third-button/third-button.component';
import { FourthButtonComponent } from './fourth-button/fourth-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SecondButtonComponent,
    ThirdButtonComponent,
    FourthButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
