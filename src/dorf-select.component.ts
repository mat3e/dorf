import { Component } from "@angular/core";

import { DorfService } from "./dorf.service";
import {
    DorfTag,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from "./abstract-dorf-field.component";

/**
 * Each option should contain key and value pair.
 * The type of the key is to be defined by DorfSelectDefinition.
 */
export interface OptionType<T> {
    key: T,
    value: string
}

/**
 * Each new component specifies its own definition interface.
 * Select field has to support options and multiple selection.
 */
export interface IDorfSelectDefinition<T> extends IDorfFieldDefinition {
    /**
     * Indicates if multiselection is possible. 
     * When binding to [multiple], the return value is always an array, so *ngIf used in template.
     */
    multiple?: boolean;

    /**
     * Elements to choose from.
     */
    optionsToSelect: OptionType<T>[];
}

/**
 * Definition for the select field.
 */
export class DorfSelectDefinition<T> extends DorfFieldDefinition<T> implements IDorfSelectDefinition<T> {

    private _multiple = false;
    private _optionsToSelect: OptionType<T>[] = [];

    constructor(options?: IDorfSelectDefinition<T>) {
        super(options);

        if (options) {
            this._multiple = options.multiple;
            this._optionsToSelect = options.optionsToSelect;
        }
    }

    get tag() { return "select" as DorfTag; }

    get multiple() { return this._multiple; }
    get optionsToSelect() { return this._optionsToSelect; }
}

/**
 * Metadata for the select field.
 */
export class DorfSelectMetadata<T> extends DorfFieldMetadata<T> implements IDorfSelectDefinition<T> {

    constructor(definition: DorfSelectDefinition<T>, options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get multiple() { return (this._definition as DorfSelectDefinition<T>).multiple }
    get optionsToSelect() { return (this._definition as DorfSelectDefinition<T>).optionsToSelect }
}



/**
 * Select input field which consumes DorfSelectMetadata for rendering.
 */
@Component({
    moduleId: module.id,
    selector: "dorf-select",
    templateUrl: "dorf-select.component.html"
})
export class DorfSelectComponent<T> extends AbstractDorfFieldComponent<T> implements IDorfSelectDefinition<T> {

    constructor(public config: DorfService) {
        super();
    }

    get multiple() { return (this.metadata as DorfSelectMetadata<T>).multiple; }
    get optionsToSelect() { return (this.metadata as DorfSelectMetadata<T>).optionsToSelect; }
}