import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  DorfCoreModule,
  DorfField,
  DorfRadioComponent,
  DorfSelectComponent,
  DorfCheckboxComponent,
  DorfButtonsComponent,
  DorfFieldComponent,
  DorfFieldWrapperComponent,
  DorfGroupWrapperComponent
} from 'dorf';

import { CustomDorfInputComponent } from './ext/custom-input.component';
import { PersonDetailsComponent } from './person/person-details.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailsComponent,
    DorfRadioComponent,
    DorfSelectComponent,
    DorfCheckboxComponent,
    DorfButtonsComponent,
    DorfFieldComponent,
    DorfFieldWrapperComponent,
    DorfGroupWrapperComponent,
    CustomDorfInputComponent
  ],
  imports: [
    BrowserModule,
    DorfCoreModule.forRoot({
      css: {
        form: 'pure-form pure-form-aligned',
        wrapper: 'pure-control-group',
        buttons: {
          save: 'pure-button pure-button-primary',
          reset: 'hidden',
          group: 'pure-controls'
        }
      },
      dorfFields: [{
        tag: DorfField.CHECKBOX,
        css: {
          section: 'pure-controls',
          innerLabel: 'pure-checkbox'
        }
      }]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
