import { Component } from "@angular/core";

import {
    DorfInputComponent,
    DorfConfigService
} from "dorf"

@Component({
    moduleId: module.id,
    selector: "custom-input",
    templateUrl: "dorf-input.component.html"
})
export class CustomDorfInputComponent<T> extends DorfInputComponent<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get placeholder() {
        return this.metadata["placeholder"];
    }
}