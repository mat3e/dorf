import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DorfModule } from "dorf";

import { AppComponent } from "./app.component";

import {
    StarRatingDefinition,
    StarRatingMetadata,
    StarRatingComponent
} from "./ext/star-rating.component";
import { PersonDetailComponent } from "./person/person-detail.component";

@NgModule({
    imports: [BrowserModule, DorfModule.forRoot({
        formClass: "pure-form pure-form-aligned",
        groupingClass: "pure-control-group",
        errorClass: "errorMessage",
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
