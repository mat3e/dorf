import { Component, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DorfConfigService } from '../dorf-config.service';
import {
    DorfTag,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from './base/abstract-dorf-field.component';

/**
 * @whatItDoes Represents true and false values for checkbox.
 *
 * @howToUse
 * You should define those values when specifying checkbox definition.
 *
 * ### Example
 *
 * ```
 * @DorfObject()
 * class TestDomainObject {
 *   @DorfCheckbox<string>({
 *     label: "Is smart?",
 *     mapping: {
 *       trueValue: "yes",
 *       falseValue: "no"
 *     },
 *     updateModelOnChange: true
 *   })
 *   private _smart: string;
 * }
 * ```
 *
 * @description
 * Mapping should be used when we don't want standard boolean values for the object's property.
 *
 * @stable
 */
export interface ICheckboxMapping<T> {
    /**
     * Value assigned when checkbox is checked.
     */
    trueValue: T;

    /**
     * Value assigned when checkbox is unchecked.
     */
    falseValue: T;
}

/**
 * @whatItDoes Represents constructor parameter for {@link DorfCheckboxDefinition}.
 *
 * @description
 * Checkbox has an optional [mapping]{@link ICheckboxMapping} property.
 *
 * @stable
 */
export interface IDorfCheckboxDefinition<T> extends IDorfFieldDefinition<T> {
    /**
     * Indicates how to map true and false checkbox values.
     */
    mapping?: ICheckboxMapping<T>;
}

/**
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the checkbox field.
 *
 * @stable
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
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the checkbox field.
 *
 * @stable
 */
export class DorfCheckboxMetadata<T> extends DorfFieldMetadata<T, DorfCheckboxDefinition<T>> implements IDorfCheckboxDefinition<T> {
    private _valueBeforeMapping: T;

    constructor(definition = new DorfCheckboxDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);

        if (options) {
            this._valueBeforeMapping = options.value;
        }
    }

    get mapping() { return this.definition.mapping; }
}

/**
 * @whatItDoes DORF checkbox field which consumes {@link DorfCheckboxMetadata} for rendering.
 *
 * @description
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: DorfTag.CHECKBOX,
    templateUrl: './dorf-checkbox.component.html'
})
// tslint:disable-next-line:max-line-length
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

    /**
     * Callback which sets the mapping value based on the state of the visible checkbox.
     */
    setValue(value: boolean) {
        if (this.metadata.mapping) {
            this.formControl.setValue(value ? this.metadata.mapping.trueValue : this.metadata.mapping.falseValue);
        } else {
            this.formControl.setValue(value);
        }
    }
}