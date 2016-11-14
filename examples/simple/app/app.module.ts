import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DorfModule } from "dorf";

import { AppComponent } from "./app.component";

import { PersonDetailComponent } from "./person/person-detail.component";

@NgModule({
    imports: [BrowserModule, DorfModule.forRoot({
        formClass: "pure-form pure-form-aligned",
        groupingClass: "pure-control-group",
        errorClass: "errorMessage",
    })],
    declarations: [AppComponent, PersonDetailComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
