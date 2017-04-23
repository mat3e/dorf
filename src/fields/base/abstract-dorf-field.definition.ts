import { Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { IDorfFieldCssClasses, DorfFieldCssClasses } from '../../base/dorf-css-classes';

/**
 * @whatItDoes Basic definition type.
 *
 * @howToUse
 * Each custom field should be built starting from the extension of this interface.
 *
 * ### Example
 *
 * ```
 * export interface IStarRatingDefinition<T> extends IDorfFieldDefinition<T> {
 *   max: number;
 * }
 * ```
 *
 * @description
 * Specifies all the fields available in definitoin.
 *
 * @stable
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
     * [CSS classes]{@link IDorfFieldCssClasses} which should be assigned to this field.
     */
    css?: IDorfFieldCssClasses;

    /**
     * Additional properties which can be defined on the fly.
     * Each property from this object would be presented directly on [field metadata]{@link DorfFieldMetadata}.
     * Accessing them should be implemented separately, e.g. in [DorfMapper extension]{@link DorfMapper}.
     */
    extras?: { [propertyName: string]: any };

    /**
     * Property known from `ng-model-options` from Angular 1.3.
     * Defines time (in milliseconds) which should pass before updating a field value.
     */
    debounce?: number;

    /**
     * Indicates if we want to immediately update a corresponding value in object.
     * Behavior is similar to `NgModel`'s one.
     */
    updateModelOnChange?: boolean;

    /**
     * Represents element index in the form.
     */
    order?: number;
}

/**
 * @whatItDoes Basic class for all the definitions.
 *
 * @description
 * Stores things to be defined by a developer before creating the form field.
 * E.g. what label should be presented in the form, what is the validation rule.
 *
 * Having definition and domain object, {@link DorfMapper} is able to create [metadata]{@link DorfFieldMetadata},
 * which is used directly in DORF's reactive form.
 *
 * @stable
 */
export abstract class DorfFieldDefinition<T> implements IDorfFieldDefinition<T> {
    public order: number;

    private _label: string;
    private _validator: ValidatorFn | ValidatorFn[] = Validators.nullValidator;
    private _asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] = null;
    private _errorMessage: string;
    private _onSummary: boolean;
    private _css: IDorfFieldCssClasses = new DorfFieldCssClasses();
    private _extras: { [propertyName: string]: any };
    private _debounce: number;
    private _updateModelOnChange: boolean;

    constructor(options?: IDorfFieldDefinition<T>) {
        if (options) {
            this._label = options.label;
            this._validator = options.validator || this._validator;
            this._asyncValidator = options.asyncValidator || this._asyncValidator;
            this._errorMessage = options.errorMessage;
            this._onSummary = options.onSummary;
            this._css = options.css ? new DorfFieldCssClasses(options.css) : this._css;
            this._extras = options.extras;
            this._debounce = options.debounce;
            this._updateModelOnChange = options.updateModelOnChange;
            this.order = options.order;
        }
    }

    /**
     * Tag is de facto a selector for the component. It allows to identify a particular component in HTML form.
     */
    abstract get tag(): string;

    get label() { return this._label; }
    get validator() { return this._validator; }
    get asyncValidator() { return this._asyncValidator; }
    get errorMessage() { return this._errorMessage; }
    get onSummary() { return this._onSummary; }
    get css() { return this._css; }
    get extras() { return this._extras; }
    get debounce() { return this._debounce; }
    get updateModelOnChange() { return this._updateModelOnChange; }
}
