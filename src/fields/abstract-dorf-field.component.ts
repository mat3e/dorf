import { Input } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn } from "@angular/forms";

import { DorfConfigService } from "../dorf-config.service";

/**
 * Possible tags for DORF. Base ones.
 */
export class DorfTag<D extends typeof DorfFieldDefinition, M extends typeof DorfFieldMetadata> {
    static get INPUT() { return "input"; }
    static get RADIO() { return "radio"; }
    static get SELECT() { return "select"; }
    static get CHECKBOX() { return "checkbox"; }

    tag: string;
    definition: D;
    metadata: M;
}

/**
 * Base Definition. Absolute minimum - all optional properties.
 */
export interface IDorfFieldDefinition<T> {
    /**
     * Label which should describe the field.
     */
    label?: string;

    /**
     * Value checker.
     */
    validator?: ValidatorFn | ValidatorFn[];

    /**
     * Message which should be displayed when validation returns errors.
     */
    errorMessage?: string;

    /**
     * Indicates if the field should be presented on the list.
     */
    isListField?: boolean;

    /**
     * Additional properties which can be defined on the fly.
     * Each property from this object would be presented directly on FieldDefinition and FieldMetadata. 
     * Accessing them should be programmed separately, in DorfMapper extension, by using [] access.
     */
    extras?: { [propertyName: string]: any };

    /**
     * Tag is to be defined inside {@link DorfFieldDefinition} and used in {@link DorfFieldMetadata}.
     */
    tag?: string;

    /**
     * Indicates if we want to immediately update a corresponding value in DomainObject.
     */
    updateModelOnChange?: boolean;
}

/**
 * Things existing in Metadata, which don't exist in Definition.
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
     * Method to be defined in Mapper, which helps setting a value in DomainObject.
     */
    setDomainObjValue?: (val: T) => void;
}

/**
 * Additional information for fields from the Domain Object.
 * E.g. what label should be presented in the form, what is the validation rule, etc.
 *
 * Having definition and Domain Object, DorfMapper is able to create Metadata, which is used directly in Reactive Form.
 */
export abstract class DorfFieldDefinition<T> implements IDorfFieldDefinition<T> {
    private _label: string;
    private _validator: ValidatorFn | ValidatorFn[] = Validators.nullValidator;
    private _errorMessage: string;
    private _isListField = false;
    private _extras: { [propertyName: string]: any };
    private _beforeFormControl: (value: T, validator: ValidatorFn | ValidatorFn[]) => void;
    private _updateModelOnChange: boolean;

    constructor(options?: IDorfFieldDefinition<T>) {
        if (options) {
            this._label = options.label;
            this._validator = options.validator || this._validator;
            this._errorMessage = options.errorMessage;
            this._isListField = options.isListField;
            this._extras = options.extras;
            this._updateModelOnChange = options.updateModelOnChange;
        }
    }

    abstract get tag(): string;

    get label() { return this._label; }
    get validator() { return this._validator; }
    get errorMessage() { return this._errorMessage }
    get isListField() { return this._isListField; }
    get extras() { return this._extras; }
    get updateModelOnChange() { return this._updateModelOnChange; }
}

/**
 * Metadata is used directly in Reactive Form by its fields.
 * There is no chance for creating Dorf Form without having Metadata.
 */
export abstract class DorfFieldMetadata<T, D extends DorfFieldDefinition<T>> extends DorfFieldDefinition<T> implements IDorfFieldMetadata<T> {

    private _key: string;
    private _value: T;
    private _setDomainObjValue: (val: T) => void;

    private _ctrl: FormControl;

    /**
     * Definition should be always as detailed as possible (e.g. DorfSelectDefinition)
     * and options should come from the Domain Object.
     */
    constructor(protected definition: D, options?: IDorfFieldMetadata<T>) {
        super(definition);

        if (options) {
            this._key = options.key;
            this._value = options.value;
            this._setDomainObjValue = options.setDomainObjValue;

            for (let prop in definition.extras) {
                this[prop] = definition.extras[prop];
            }
        }
    }

    get tag() { return this.definition.tag; }

    get key() { return this._key; }

    get formControl() {
        if (!this._ctrl) {
            this._ctrl = this.extractFormControl();
        }
        return this._ctrl;
    }

    /**
     * Function for extracting FormControl (value and validators) from FieldMetadata.
     */
    protected extractFormControl() {
        let ctrl = new FormControl(this._value, this.validator);

        if (this.updateModelOnChange) {
            ctrl.valueChanges.subscribe(() => {
                this._setDomainObjValue(ctrl.value);
            });
        }

        return ctrl;
    }
}



/**
 * Base for each Dorf field.
 */
export abstract class AbstractDorfFieldComponent<T, M extends DorfFieldMetadata<T, DorfFieldDefinition<T>>> implements IDorfFieldDefinition<T> {

    @Input()
    metadata: M;

    @Input()
    parentForm: FormGroup;
    constructor(public config: DorfConfigService) { }

    get key() { return this.metadata.key; }
    get label() { return this.metadata.label; }
    get errorMessage() { return this.metadata.errorMessage; }

    get invalid() {
        return this.formControl.touched && this.formControl.dirty && this.formControl.invalid;
    }

    protected get formControl() {
        return this.metadata.formControl;
    }
}