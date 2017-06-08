import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DorfModule } from 'dorf';

import { AppComponent } from './app.component';

import {
    STAR_RATING,
    StarRatingDefinition,
    StarRatingMetadata,
    StarRatingComponent
} from './ext/star-rating.component';
import { PersonDetailComponent } from './person/person-detail.component';

@NgModule({
    imports: [BrowserModule, DorfModule.forRoot({
        css: {
            form: 'pure-form pure-form-aligned',
            wrapper: 'pure-control-group',
            error: 'error-message',
            buttons: {
                save: 'pure-button pure-button-primary',
                reset: 'hidden',
                group: 'pure-controls'
            }
        },
        dorfFields: [STAR_RATING]
    })],
    declarations: [AppComponent, StarRatingComponent, PersonDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
