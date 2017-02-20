import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
    DorfField,
    DorfCoreModule,
    DorfRadioComponent,
    DorfSelectComponent,
    DorfCheckboxComponent,
    DorfButtonsComponent,
    DorfFieldWrapperComponent
} from 'dorf';

import { AppComponent } from './app.component';

import { CustomDorfInputComponent } from './ext/custom-input.component';

import { PersonDetailComponent } from './person/person-detail.component';

@NgModule({
    imports: [BrowserModule, DorfCoreModule.forRoot({
        css: {
            form: 'pure-form pure-form-aligned',
            group: 'pure-control-group',
            buttons: {
                save: 'pure-button pure-button-primary',
                reset: 'hidden',
                group: 'pure-controls'
            }
        },
        dorfFields: [{
            tag: DorfField.CHECKBOX,
            css: {
                group: 'pure-controls',
                label: 'pure-checkbox'
            }
        }]
    })],
    declarations: [
        DorfRadioComponent,
        DorfSelectComponent,
        DorfCheckboxComponent,
        DorfButtonsComponent,
        DorfFieldWrapperComponent,
        AppComponent,
        CustomDorfInputComponent,
        PersonDetailComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
