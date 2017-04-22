import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
    DorfField,
    DorfCoreModule,
    DorfRadioComponent,
    DorfSelectComponent,
    DorfCheckboxComponent,
    DorfButtonsComponent,
    DorfFieldComponent,
    DorfFieldWrapperComponent
} from 'dorf';

import { AppComponent } from './app.component';

import { CustomDorfInputComponent } from './ext/custom-input.component';

import { PersonDetailComponent } from './person/person-detail.component';

@NgModule({
    imports: [BrowserModule, DorfCoreModule.forRoot({
        css: {
            form: 'pure-form pure-form-aligned',
            section: 'pure-control-group',
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
    })],
    declarations: [
        DorfRadioComponent,
        DorfSelectComponent,
        DorfCheckboxComponent,
        DorfButtonsComponent,
        DorfFieldComponent,
        DorfFieldWrapperComponent,
        AppComponent,
        CustomDorfInputComponent,
        PersonDetailComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
