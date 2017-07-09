import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DorfModule, DorfField } from 'dorf';

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
        section: 'row',
        wrapper: 'form-group col-md-6 col-sm-12 row',
        label: 'col-sm-12 col-lg-2 col-form-label',
        fieldGeneralization: 'col-sm-12 col-lg-10',
        htmlField: 'form-control',
        error: 'form-control-feedback col-sm-12',
        buttons: {
          save: 'btn btn-primary',
          reset: 'hidden'
        }
      },
      dorfFields: [{
        tag: DorfField.CHECKBOX,
        css: {
          dorfField: 'form-check',
          innerLabel: 'form-check-label',
          htmlField: 'form-check-input'
        }
      }, {
        tag: DorfField.RADIO,
        css: {
          dorfField: 'form-check',
          innerLabel: 'form-check-label form-check-inline',
          htmlField: 'form-check-input'
        }
      }, {
        tag: DorfField.NESTED,
        css: {
          label: 'col-sm-12 col-form-label',
          fieldGeneralization: 'col-sm-12',
          wrapper: 'form-group col-sm-12 col-md-4 row',
          fieldset: 'fieldset'
        }
      }],
      columnsNumber: 2,
      requiredWithStar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
