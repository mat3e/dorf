import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DorfModule, DorfField } from 'dorf';

import { AppComponent } from './app.component';

import { PersonDetailComponent } from './person/person-detail.component';

@NgModule({
    imports: [BrowserModule, DorfModule.forRoot({
        css: {
            form: 'pure-form pure-form-aligned',
            section: 'pure-control-group',
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
    })],
    declarations: [AppComponent, PersonDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
