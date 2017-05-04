import 'rxjs/add/operator/debounceTime';

import { FormControl } from '@angular/forms';

import { IDorfCommonCssClasses, IDorfFieldCssClasses, IDorfGeneralCssClasses } from '../../base/dorf-css-classes';
import { IDorfDefinitionBase, IDorfFieldDefinition, DorfFieldDefinition } from './abstract-dorf-field.definition';

/**
 * @whatItDoes Defines things existing in metadata, which don't exist directly in the definition.
 * Internal stuff, used especially in  {@link DorfMapper}.
 *
 * @stable
 */
export interface IDorfFieldMetadata<T> {
    /**
     * An unique identifier, property name. Used as id in DOM element.
     */
    key: string;

    /**
     * Value of the field.
     */
    value?: T;

    /**
     * Method to be defined by [mapper]{@link DorfMapper}, which helps setting a value in domain object.
     * It is activated when `updateModelOnChange` is set to true in [definition]{@link DorfFieldDefinition}.
     */
    setDomainObjValue?: (val: T) => void;

    /**
     * Indicates that metadata exists within the context of a group.
     */
    isNested?: boolean;

    /**
     * When metadata is nested within the group, group is passing its CSS.
     */
    parentCss?: IDorfGeneralCssClasses;
}

/**
 * @whatItDoes Base class for field and for the nested object.
 *
 * @stable
 */
export abstract class DorfMetadataBase<T, D extends IDorfDefinitionBase<T>> implements IDorfFieldMetadata<T>, IDorfDefinitionBase<T> {
    protected _value: T;
    protected _invalid: boolean;

    private _key: string;
    private _parentCss: IDorfGeneralCssClasses;

    constructor(protected definition: D, options?: IDorfFieldMetadata<T>) {
        if (definition) {
            // tslint:disable-next-line:forin
            for (let prop in definition.extras) {
                Object.defineProperty(this, prop, {
                    get: () => definition.extras[prop]
                });
            }
        }
        if (options) {
            this._key = options.key;
            this._value = options.value;
            this._parentCss = options.parentCss;
        }
    }

    get key() { return this._key; }
    get value() { return this._value; }
    get invalid() { return this._invalid; }
    get label() { return this.definition.label; }
    get css() { return this.definition.css; }
    get order() { return this.definition.order; }
    set order(newOrder: number) { this.definition.order = newOrder; }
    get isNested() { return !!this._parentCss; }

    get tag() { return this.definition.tag; }

    getCss(cssClass: string) {
        return this.definition.css[cssClass] || (this._parentCss || {})[cssClass];
    }
}

/**
 * @whatItDoes Is used directly in reactive form by the fields.
 * There is no chance for creating DORF form without having metadata.
 *
 * @stable
 */
export abstract class DorfFieldMetadata<T, D extends IDorfFieldDefinition<T>> extends DorfMetadataBase<T, D>
    implements IDorfFieldMetadata<T>, IDorfFieldDefinition<T> {

    private _ctrl: FormControl;

    /**
     * Used rather by {@link DorfMapper}. Definition type should be always as detailed as possible (e.g. DorfSelectDefinition).
     */
    constructor(definition: D, options?: IDorfFieldMetadata<T>) {
        super(definition, options);

        if (options) {
            this._setDomainObjValue = definition.updateModelOnChange ? options.setDomainObjValue : this._setDomainObjValue;
        }
    }

    get errorMessage() { return this.definition.errorMessage; }
    get onSummary() { return this.definition.onSummary; }

    get formControl() {
        if (!this._ctrl) {
            this._ctrl = this.extractFormControl();
        }
        return this._ctrl;
    }

    /**
     * Function for extracting FormControl (value and validators) from `FieldMetadata`.
     */
    protected extractFormControl() {
        let ctrl = new FormControl(this._value, this.definition.validator, this.definition.asyncValidator);

        let delay = this.definition.debounce;
        if (delay && delay > 0) {
            ctrl.valueChanges.debounceTime(delay).subscribe((value: T) => {
                this._setDomainObjValue(value);
                this._invalid = this.formControl.dirty && this.formControl.invalid;
            });
        } else {
            ctrl.valueChanges.subscribe((value: T) => {
                this._setDomainObjValue(value);
                this._invalid = this.formControl.dirty && this.formControl.invalid;
            });
        }

        return ctrl;
    }

    private _setDomainObjValue: (val: T) => void = (newVal: T) => { };
}
