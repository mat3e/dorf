import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DorfModule, DorfField } from 'dorf';

import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person/person-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailComponent
  ],
  imports: [
    BrowserModule,
    DorfModule.forRoot({
      css: {
        form: 'pure-form pure-form-aligned',
        wrapper: 'pure-control-group',
        error: 'pure-form-message-inline',
        buttons: {
          save: 'pure-button pure-button-primary',
          reset: 'hidden',
          group: 'pure-controls'
        }
      },
      dorfFields: [{
        tag: DorfField.CHECKBOX,
        css: {
          innerLabel: 'pure-checkbox'
        }
      }]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
