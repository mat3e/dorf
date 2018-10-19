import { debounceTime } from 'rxjs/operators';

import { FormControl, Validators } from '@angular/forms';

import { IDorfGeneralCssClasses } from '../../base/dorf-css-classes';
import { DorfDefinitionBase, DorfFieldDefinition, IDorfDefinitionBase, IDorfFieldDefinition } from './abstract-dorf-field.definition';

/**
 * Defines things existing in metadata, which don't exist directly in the definition.
 * Internal stuff, used especially in {@link DorfMapper}.
 *
 * @stable
 */
export interface IDorfFieldMetadata<T> {
    /**
     * An unique identifier, property name. Used as id in HTML element.
     */
    key: string;

    /**
     * Value of the field.
     */
    value?: T;

    /**
     * Method to be defined by [mapper]{@link DorfMapper}, which helps setting a value in Domain Object.
     * It is activated when `updateModelOnChange` is `true` in [definition]{@link DorfFieldDefinition}.
     */
    setDomainObjValue?: (val: T) => void;

    /**
     * When metadata is nested within the group, group is passing its CSS.
     */
    parentCss?: IDorfGeneralCssClasses;

    /**
     * Helper.
     * Indicates that metadata is for a required field.
     */
    isRequired?: boolean;
}

/**
 * Base class for field and for the nested object.
 *
 * @stable
 */
export abstract class DorfMetadataBase<T, D extends IDorfDefinitionBase<T>> implements IDorfFieldMetadata<T>, IDorfDefinitionBase<T> {
    protected _value?: T;
    protected _invalid?: boolean;

    private _key: string;
    private _parentCss?: IDorfGeneralCssClasses;

    /**
     * Called by {@link DorfMapper}.
     *
     * @param definition extension of {@link IDorfDefinitionBase} with parameters to be propagated
     * @param options extension of {@link IDorfFieldMetadata}
     */
    constructor(protected definition: D, options?: IDorfFieldMetadata<T>) {
        if (definition.extras) {
            // tslint:disable-next-line:forin
            for (let prop in definition.extras) {
                let value = definition.extras[prop];
                Object.defineProperty(this, prop, {
                    get: () => value
                });
            }
        }
        if (options) {
            this._key = options.key;
            this._value = options.value;
            this._parentCss = options.parentCss;
        }
    }

    /** @inheritdoc */
    get key() { return this._key; }
    /** @inheritdoc */
    get value() { return this._value; }
    /** @inheritdoc */
    get invalid() { return this._invalid; }
    /** @inheritdoc */
    get label() { return this.definition.label; }
    /** @inheritdoc */
    get css() { return this.definition.css; }
    /** @inheritdoc */
    get order(): number | undefined { return this.definition.order; }
    /** @inheritdoc */
    set order(newOrder: number | undefined) { this.definition.order = newOrder; }
    /** @inheritdoc */
    get parentCss() { return this._parentCss; }

    /** @inheritdoc */
    get tag() { return (this.definition as DorfDefinitionBase<T>).tag; }

    /**
     * Gets CSS classes, with accordance to the priorities. The closer the definition, the sooner applied.
     *
     * @param cssClass classes to be got, e.g. `'label'` for label ones
     */
    getCss(cssClass: string) {
        return (this.definition.css || {})[cssClass] || (this._parentCss || {})[cssClass];
    }
}

/**
 * Class for generic types handling.
 * @see [GitHub issue]{@link https://github.com/Microsoft/TypeScript/issues/16985}
 */
export declare class AnyMetadata extends DorfMetadataBase<any, IDorfDefinitionBase<any>> { }

/**
 * Is used directly in reactive form by the fields.
 * There is no chance for creating DORF form without having metadata.
 *
 * @stable
 */
export abstract class DorfFieldMetadata<T, D extends IDorfFieldDefinition<T>> extends DorfMetadataBase<T, D>
    implements IDorfFieldMetadata<T>, IDorfFieldDefinition<T> {

    private _ctrl: FormControl;
    private _isRequired: boolean;

    /**
     * Used rather by {@link DorfMapper}. Definition type should be always as detailed as possible (e.g. DorfSelectDefinition).
     */
    constructor(definition: D, options?: IDorfFieldMetadata<T>) {
        super(definition, options);

        let val = definition.validator;
        if (val) {
            if (val instanceof Array) {
                this._isRequired = (val.indexOf(Validators.required) !== -1 || val.indexOf(Validators.requiredTrue) !== -1);
            } else {
                this._isRequired = (val === Validators.required || val === Validators.requiredTrue);
            }
        }

        if (options) {
            this._setDomainObjValue
                = definition.updateModelOnChange && options.setDomainObjValue ? options.setDomainObjValue : this._setDomainObjValue;
        }
    }

    /** @inheritdoc */
    get errorMessage() { return this.definition.errorMessage; }
    /** @inheritdoc */
    get onSummary() { return this.definition.onSummary; }
    /** @inheritdoc */
    get isRequired() { return this._isRequired; }

    /**
     * Getter with proxy. Converts metadata to `FormControl`.
     */
    get formControl() {
        if (!this._ctrl) {
            this._ctrl = this.extractFormControl();
        }
        return this._ctrl;
    }

    /**
     * Function for extracting `FormControl` (value and validators) from `FieldMetadata`.
     */
    protected extractFormControl() {
        let ctrl = new FormControl(this._value, this.definition.validator, this.definition.asyncValidator);

        let delay = this.definition.debounce;
        if (delay && delay > 0) {
            ctrl.valueChanges.pipe(debounceTime(delay)).subscribe((value: T) => {
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
