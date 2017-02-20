import 'rxjs/add/operator/debounceTime';

import { FormControl } from '@angular/forms';
import { DorfFieldDefinition } from './dorf-field.definition';

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
}

/**
 * @whatItDoes is used directly in reactive form by the fields.
 * There is no chance for creating DORF form without having metadata.
 *
 * @stable
 */
// tslint:disable-next-line:max-line-length
export abstract class DorfFieldMetadata<T, D extends DorfFieldDefinition<T>> extends DorfFieldDefinition<T> implements IDorfFieldMetadata<T> {

    private _key: string;
    private _value: T;
    private _setDomainObjValue: (val: T) => void = (newVal: T) => { };

    // tslint:disable-next-line:member-ordering
    private _invalid: boolean;

    private _ctrl: FormControl;

    /**
     * Used rather by {@link DorfMapper}. Definition type should be always as detailed as possible (e.g. DorfSelectDefinition).
     */
    constructor(protected definition: D, options?: IDorfFieldMetadata<T>) {
        super(definition);

        if (options) {
            this._key = options.key;
            this._value = options.value;
            this._setDomainObjValue = this.updateModelOnChange ? options.setDomainObjValue : this._setDomainObjValue;

            // tslint:disable-next-line:forin
            for (let prop in definition.extras) {
                Object.defineProperty(this, prop, {
                    get: () => this.extras[prop]
                });
            }
        }
    }

    get tag() { return this.definition.tag; }
    get key() { return this._key; }
    get invalid() { return this._invalid; }
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
        let ctrl = new FormControl(this._value, this.validator, this.asyncValidator);

        if (this.debounce && this.debounce > 0) {
            ctrl.valueChanges.debounceTime(this.debounce).subscribe((value: T) => {
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
}