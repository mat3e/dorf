import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DorfModule } from "dorf";

import { AppComponent } from "./app.component";

import { CustomDorfInputComponent } from "./ext/custom-input.component";

import { PersonDetailComponent } from "./person/person-detail.component";

@NgModule({
    imports: [BrowserModule, DorfModule.forRoot({
        formClass: "pure-form pure-form-aligned",
        groupingClass: "pure-control-group",
        errorClass: "errorMessage",
    })],
    declarations: [AppComponent, CustomDorfInputComponent, PersonDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
