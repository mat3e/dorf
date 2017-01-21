import { Component, OnChanges } from "@angular/core";
import { FormControl } from "@angular/forms";

import { DorfConfigService } from "../dorf-config.service";
import {
    DorfTag,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from "./abstract-dorf-field.component";

/**
 * Values for true and false from Checkbox.
 */
export interface ICheckboxMapping<T> {
    trueValue: T,
    falseValue: T
}

/**
 * Each new component specifies its own definition interface.
 * Checkbox field has to be handled differently than Input, 
 * because property binding to [type] (providing "checkbox") fails.
 * Checkbox should also allow mapping a boolean value into something else.
 */
export interface IDorfCheckboxDefinition<T> extends IDorfFieldDefinition<T> {
    /**
     * Indicates how to map true and false checkbox values.
     */
    mapping?: ICheckboxMapping<T>
}

/**
 * Definition for the Checkbox field.
 */
export class DorfCheckboxDefinition<T> extends DorfFieldDefinition<T> implements IDorfCheckboxDefinition<T> {

    private _mapping: ICheckboxMapping<T>;

    constructor(options?: IDorfCheckboxDefinition<T>) {
        super(options);

        if (options) {
            this._mapping = options.mapping;
        }
    }

    get mapping() { return this._mapping; }

    get tag() { return DorfTag.CHECKBOX; }
}

/**
 * Metadata for the Checkbox field.
 */
export class DorfCheckboxMetadata<T> extends DorfFieldMetadata<T, DorfCheckboxDefinition<T>> implements IDorfCheckboxDefinition<T> {
    private _valueBeforeMapping: T;

    constructor(definition = new DorfCheckboxDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);

        if (options) {
            this._valueBeforeMapping = options.value;
        }
    }

    get mapping() { return this.definition.mapping }
}



/**
 * Checkbox input field which consumes DorfCheckboxMetadata for rendering.
 */
@Component({
    moduleId: `${module.id}`,
    selector: "dorf-checkbox",
    templateUrl: "./dorf-checkbox.component.html"
})
export class DorfCheckboxComponent<T> extends AbstractDorfFieldComponent<T, DorfCheckboxMetadata<T>> implements IDorfCheckboxDefinition<T>, OnChanges {

    /**
     * True/false value which is seen by the end user.
     */
    checkboxValue: boolean;

    constructor(config: DorfConfigService) {
        super(config);
    }

    ngOnChanges() {
        if (this.metadata.mapping) {
            this.checkboxValue = this.formControl.value === this.metadata.mapping.trueValue;
        } else {
            this.checkboxValue = this.formControl.value;
        }
    }

    setValue(value: boolean) {
        if (this.metadata.mapping) {
            this.formControl.setValue(value ? this.metadata.mapping.trueValue : this.metadata.mapping.falseValue);
        } else {
            this.formControl.setValue(value);
        }
    }
}