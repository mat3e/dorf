import { Input, OnInit, OnChanges } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn } from "@angular/forms";

export type DorfTag = "input" | "radio" | "select";

/**
 * Base Definition. Absolute minimum - all optional properties.
 */
export interface IDorfFieldDefinition {
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
     * Used for ordering inside the form.
     */
    order?: number;
}

/**
 * Additional information for fields from the Domain Object.
 * E.g. what label should be presented in the form, what is the validation rule, etc.
 *
 * Having definition and Domain Object, DorfMapper is able to create Metadata, which is used directly in Reactive Form.
 */
export abstract class DorfFieldDefinition<T> implements IDorfFieldDefinition {

    private _label: string;
    private _validator: ValidatorFn | ValidatorFn[] = Validators.nullValidator;
    private _errorMessage: string;
    private _isListField = false;

    constructor(options?: IDorfFieldDefinition) {
        if (options) {
            // generic way of assigning properties; used for library extensions
            for (let prop in options) {
                this[`_${prop}`] = options[prop];
            }

            // _validator shouldn't be undefined (which may be caused by the previous loop)
            this._validator = this._validator || Validators.nullValidator;
        }
    }

    abstract get tag(): DorfTag;

    get label() { return this._label; }
    get validator() { return this._validator; }
    get errorMessage() { return this._errorMessage }
    get isListField() { return this._isListField; }
}

/**
 * Metadata is used directly in Reactive Form by its fields.
 * There is no chance for creating Dorf Form without having Metadata.
 */
export abstract class DorfFieldMetadata<T> extends DorfFieldDefinition<T> implements IDorfFieldMetadata<T> {

    private _key: string;
    private _value: T;

    private _order: number;

    /**
     * Definition should be always as detailed as possible (e.g. DorfSelectDefinition)
     * and options should come from the Domain Object.
     */
    constructor(protected _definition: DorfFieldDefinition<T>, options?: IDorfFieldMetadata<T>) {
        super(_definition);

        if (options) {
            this._key = options.key;
            this._value = options.value;
            this._order = options.order;
        }
    }

    get tag() { return this._definition.tag; }

    get key() { return this._key; }
    get order() { return this._order; }

    /**
     * Function for extracting FormControl (value and validators) from FieldMetadata.
     */
    get formControl() { return new FormControl(this._value, this.validator) }
}



/**
 * Base for each Dorf field.
 */
export abstract class AbstractDorfFieldComponent<T> implements IDorfFieldDefinition, OnInit, OnChanges {

    @Input()
    metadata: DorfFieldMetadata<T>;

    @Input()
    parentForm: FormGroup;

    private _ctrl: FormControl;

    ngOnInit() {
        this.initCtrl();
    }

    ngOnChanges() {
        this.initCtrl();
    }

    get key() { return this.metadata.key; }
    get label() { return this.metadata.label; }
    get errorMessage() { return this.metadata.errorMessage; }

    get invalid() {
        return this._ctrl.touched && this._ctrl.dirty && !this._ctrl.valid;
    }

    private initCtrl() {
        this._ctrl = this.parentForm.controls[this.key] as FormControl;
    }
}