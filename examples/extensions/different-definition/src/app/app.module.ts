import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DorfModule } from 'dorf';

import { PersonDetailsComponent } from './person/person-details.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailsComponent
  ],
  imports: [
    BrowserModule,
    DorfModule.forRoot({
      css: {
        form: 'pure-form pure-form-aligned',
        wrapper: 'pure-control-group',
        error: 'error-message',
        buttons: {
          save: 'pure-button pure-button-primary',
          reset: 'hidden',
          group: 'pure-controls'
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
