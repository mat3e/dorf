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
 * Select field has to support options and multiple selection.
 */
export interface IDorfSelectDefinition<T> extends IDorfChooseDefinition<T> {
    /**
     * Indicates if multiselection is possible. 
     * When binding to [multiple], the return value is always an array, so *ngIf used in template.
     */
    multiple?: boolean;
}

/**
 * Definition for the select field.
 */
export class DorfSelectDefinition<T> extends DorfChooseDefinition<T> implements IDorfSelectDefinition<T> {

    private _multiple = false;

    constructor(options?: IDorfSelectDefinition<T>) {
        super(options);

        if (options) {
            this._multiple = options.multiple;
        }
    }

    get multiple() { return this._multiple; }

    get tag() { return DorfTag.SELECT; }
}

/**
 * Metadata for the select field.
 */
export class DorfSelectMetadata<T> extends DorfChooseMetadata<T, DorfSelectDefinition<T>> implements IDorfSelectDefinition<T> {

    constructor(definition = new DorfSelectDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get multiple() { return this.definition.multiple }
}



/**
 * Select input field which consumes DorfSelectMetadata for rendering.
 */
@Component({
    moduleId: module.id,
    selector: "dorf-select",
    templateUrl: "dorf-select.component.html"
})
export class DorfSelectComponent<T> extends DorfChooseComponent<T, DorfSelectMetadata<T>> implements IDorfSelectDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get multiple() { return this.metadata.multiple; }
}