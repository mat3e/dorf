import { Component } from "@angular/core";

import { DorfConfigService } from "../dorf-config.service";

import {
    DorfTag,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from "./abstract-dorf-field.component";

import {
    IDorfChooseDefinition,
    DorfChooseDefinition,
    DorfChooseMetadata,
    DorfChooseComponent
} from "./abstract-dorf-choose.component";

/**
 * Each new component specifies its own definition interface.
 * Radio field has to support possible options.
 */
export interface IDorfRadioDefinition<T> extends IDorfChooseDefinition<T> { }

/**
 * Definition for the radio field.
 */
export class DorfRadioDefinition<T> extends DorfChooseDefinition<T> implements IDorfRadioDefinition<T> {

    constructor(options?: IDorfRadioDefinition<T>) {
        super(options);
    }

    get tag() { return DorfTag.RADIO; }
}

/**
 * Metadata for the radio field.
 */
export class DorfRadioMetadata<T> extends DorfChooseMetadata<T, DorfRadioDefinition<T>> implements IDorfRadioDefinition<T> {

    constructor(definition = new DorfRadioDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }
}



/**
 * Radio input field which consumes DorfRadioMetadata for rendering.
 */
@Component({
    moduleId: `${module.id}`,
    selector: "dorf-radio",
    templateUrl: "./dorf-radio.component.html"
})
export class DorfRadioComponent<T> extends DorfChooseComponent<T, DorfRadioMetadata<T>> implements IDorfRadioDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }
}