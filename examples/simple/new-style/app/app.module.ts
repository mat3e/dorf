import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DorfModule } from 'dorf';

import { AppComponent } from './app.component';

import { PersonDetailComponent } from './person/person-detail.component';

@NgModule({
    imports: [BrowserModule, DorfModule.forRoot({
        css: {
            general: {
                form: 'pure-form pure-form-aligned',
                group: 'pure-control-group',
                error: 'pure-form-message-inline'
            },
            checkbox: {
                label: 'pure-checkbox'
            }
        }
    })],
    declarations: [AppComponent, PersonDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
