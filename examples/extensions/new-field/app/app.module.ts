import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DorfModule } from 'dorf';

import { AppComponent } from './app.component';

import {
    StarRatingDefinition,
    StarRatingMetadata,
    StarRatingComponent
} from './ext/star-rating.component';
import { PersonDetailComponent } from './person/person-detail.component';

@NgModule({
    imports: [BrowserModule, DorfModule.forRoot({
        css: {
            general: {
                form: 'pure-form pure-form-aligned',
                group: 'pure-control-group',
                error: 'error-message'
            }
        },
        additionalMetadataKinds: [{
            tag: StarRatingDefinition.TAG,
            definition: StarRatingDefinition,
            metadata: StarRatingMetadata
        }]
    })],
    declarations: [AppComponent, StarRatingComponent, PersonDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
