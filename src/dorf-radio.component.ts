import { Component } from "@angular/core";

import { DorfService } from "./dorf.service";
import { OptionType } from "./dorf-select.component"
import {
    DorfTag,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from "./abstract-dorf-field.component";

/**
 * Each new component specifies its own definition interface.
 * Radio field has to support possible options.
 */
export interface IDorfRadioDefinition<T> extends IDorfFieldDefinition {
    /**
     * Elements to choose from.
     */
    optionsToSelect: OptionType<T>[];
}

/**
 * Definition for the radio field.
 */
export class DorfRadioDefinition<T> extends DorfFieldDefinition<T> implements IDorfRadioDefinition<T> {

    private _optionsToSelect: OptionType<T>[] = [];

    constructor(options?: IDorfRadioDefinition<T>) {
        super(options);

        if (options) {
            this._optionsToSelect = options.optionsToSelect;
        }
    }

    get tag() { return "radio" as DorfTag; }
    get optionsToSelect() { return this._optionsToSelect; }
}

/**
 * Metadata for the radio field.
 */
export class DorfRadioMetadata<T> extends DorfFieldMetadata<T> implements IDorfRadioDefinition<T> {

    constructor(definition: DorfRadioDefinition<T>, options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get optionsToSelect() { return (this._definition as DorfRadioDefinition<T>).optionsToSelect }
}



/**
 * Radio input field which consumes DorfRadioMetadata for rendering.
 */
@Component({
    moduleId: module.id,
    selector: "dorf-radio",
    templateUrl: "dorf-radio.component.html"
})
export class DorfRadioComponent<T> extends AbstractDorfFieldComponent<T> implements IDorfRadioDefinition<T> {

    constructor(public config: DorfService) {
        super();
    }

    get optionsToSelect() { return (this.metadata as DorfRadioMetadata<T>).optionsToSelect; }
}