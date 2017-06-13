import { Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { IDorfFieldCssClasses, DorfCssClasses } from '../../base/dorf-css-classes';

/**
 * The simplest definition, base for fields and for nested objects.
 *
 * @stable
 */
export interface IDorfDefinitionBase<T> {
    /**
     * Label which should describe the field.
     */
    label?: string;

    /**
     * [CSS classes]{@link IDorfFieldCssClasses} which should be assigned to this field.
     */
    css?: IDorfFieldCssClasses;

    /**
     * Represents element index in the form.
     */
    order?: number;

    /**
     * Tag is de facto a selector for the component. It allows to identify a particular component in HTML form.
     */
    tag?: string;

    /**
     * Additional properties which can be defined on the fly.
     * Every property from this object would be presented directly on [field metadata]{@link DorfFieldMetadata}.
     * Accessing them should be implemented separately, e.g. in [DorfMapper extension]{@link DorfMapper}.
     */
    extras?: { [propertyName: string]: any };
}

/**
 * Basic definition type for a field from Domain Object.
 *
 * Every custom field should be built starting from the extension of this interface.
 * It contains parameters to be defined for a field.
 *
 * @example
 * ```
 *
 *  //
 *  export interface IStarRatingDefinition<T> extends IDorfFieldDefinition<T> {
 *    max: number;
 *  }
 * ```
 *
 * @stable
 */
export interface IDorfFieldDefinition<T> extends IDorfDefinitionBase<T> {
    /**
     * Value checker.
     */
    validator?: ValidatorFn | ValidatorFn[];

    /**
     * Asynchronous value checker.
     */
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];

    /**
     * Message which should be displayed when validation returns errors.
     */
    errorMessage?: string;

    /**
     * Indicates if the field is important enough to be presented e.g. on grid or on the summary screen.
     */
    onSummary?: boolean;

    /**
     * Indicates if we want to immediately update a corresponding value in object.
     * Behavior is similar to `NgModel`'s one.
     */
    updateModelOnChange?: boolean;

    /**
     * Property known from `ng-model-options`, from Angular 1.3.
     * Defines time (in milliseconds) which should pass before updating a field value in a source model.
     * This should be specified together with `updateModelOnChange` set to true.
     */
    debounce?: number;
}

/**
 * Common part for fields and nested objects.
 *
 * @stable
 */
export abstract class DorfDefinitionBase<T> implements IDorfDefinitionBase<T> {
    public order: number;

    private _css: IDorfFieldCssClasses = new DorfCssClasses();
    private _label: string;
    private _extras: { [propertyName: string]: any };

    /**
     * HTML identifier of the element. Unique for DORF.
     */
    abstract get tag(): string;

    /**
     * Creates a definition accordingly to an optional parameter.
     *
     * @param options {IDorfDefinitionBase} interface storing values to be presented in the definition
     */
    constructor(options?: IDorfDefinitionBase<T>) {
        if (options) {
            this.order = options.order;

            this._css = options.css ? new DorfCssClasses(options.css) : this._css;
            this._label = options.label;
            this._extras = options.extras;
        }
    }

    /** @inheritdoc */
    get css() { return this._css; }
    /** @inheritdoc */
    get label() { return this._label; }
    /** @inheritdoc */
    get extras() { return this._extras; }
}

/**
 * Basic class for all the field definitions.
 *
 * Stores things to be defined by a developer before creating the form field.
 * E.g. what label should be presented in the form, what is the validation rule.
 *
 * Having definition and Domain Object, {@link DorfMapper} is able to create [metadata]{@link DorfFieldMetadata},
 * which is used directly in DORF's reactive form.
 *
 * @stable
 */
export abstract class DorfFieldDefinition<T> extends DorfDefinitionBase<T> implements IDorfFieldDefinition<T> {
    private _validator: ValidatorFn | ValidatorFn[] = Validators.nullValidator;
    private _asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] = null;
    private _errorMessage: string;
    private _onSummary: boolean;
    private _debounce: number;
    private _updateModelOnChange: boolean;

    /** @inheritdoc */
    constructor(options?: IDorfFieldDefinition<T>) {
        super(options);

        if (options) {
            this._validator = options.validator || this._validator;
            this._asyncValidator = options.asyncValidator || this._asyncValidator;
            this._errorMessage = options.errorMessage;
            this._onSummary = options.onSummary;
            this._debounce = options.debounce;
            this._updateModelOnChange = options.updateModelOnChange;
        }
    }

    /** @inheritdoc */
    get validator() { return this._validator; }
    /** @inheritdoc */
    get asyncValidator() { return this._asyncValidator; }
    /** @inheritdoc */
    get errorMessage() { return this._errorMessage; }
    /** @inheritdoc */
    get onSummary() { return this._onSummary; }
    /** @inheritdoc */
    get debounce() { return this._debounce; }
    /** @inheritdoc */
    get updateModelOnChange() { return this._updateModelOnChange; }
}
