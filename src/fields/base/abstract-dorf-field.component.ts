import { Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { IDorfFieldCssClasses, DorfFieldCssClasses } from '../../base/dorf-css-classes.model';
import { DorfConfigService } from '../../dorf-config.service';

/**
 * @whatItDoes Represents a field in a [mapper]{@link DorfMapper}-friendly form. Stores all default DORF tags.
 *
 * @stable
 */
export class DorfTag<D extends typeof DorfFieldDefinition, M extends typeof DorfFieldMetadata> {
    static get INPUT() { return 'dorf-input'; }
    static get RADIO() { return 'dorf-radio'; }
    static get SELECT() { return 'dorf-select'; }
    static get CHECKBOX() { return 'dorf-checkbox'; }

    tag: string;
    // TODO: do we need this?
    definition: D;
    metadata: M;

    /** @internal */
    // TODO: generic mechanism for creating DorfTags. Static function as in Angular's makeDecorator
    // tslint:disable-next-line:max-line-length
    static createNewTag(tagName: string, options: IDorfFieldDefinition<any>): DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata> {
        return {
            tag: tagName,
            definition: null,
            metadata: null
        };
    }
}

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
     * Indicates if the field should be presented on the list.
     */
    isListField?: boolean;

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
}

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
    private _label: string;
    private _validator: ValidatorFn | ValidatorFn[] = Validators.nullValidator;
    private _asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] = null;
    private _errorMessage: string;
    private _isListField: boolean = false;
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
            this._isListField = options.isListField || this._isListField;
            this._css = options.css ? new DorfFieldCssClasses(options.css) : this._css;
            this._extras = options.extras;
            this._debounce = options.debounce;
            this._updateModelOnChange = options.updateModelOnChange;
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
    get isListField() { return this._isListField; }
    get css() { return this._css; }
    get extras() { return this._extras; }
    get debounce() { return this._debounce; }
    get updateModelOnChange() { return this._updateModelOnChange; }
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
                    get: this.extras[prop]
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

/**
 * @whatItDoes Base for each DORF field.
 *
 * @howToUse
 * Each custom field should be defined by a `Component` which extends this one.
 * Subclass shouldn't contain annotations inside, e.g. on properties or methods.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   moduleId: module.id,
 *   selector: "star",
 *   styleUrls: ["star-rating.component.css"],
 *   templateUrl: "star-rating.component.html"
 * })
 * export class StarRatingComponent<T> extends AbstractDorfFieldComponent<T, StarRatingMetadata<T>> implements IStarRatingDefinition<T> {
 *
 *   constructor(config: DorfConfigService) {
 *     super(config);
 *   }
 *
 *   setValue(val: number) {
 *     this.formControl.setValue(val + 1);
 *   }
 *
 *   get max() { return this.metadata.max; }
 *
 *   get stars() { return new Array(this.max); }
 *   get value() { return this.formControl.value; }
 * }
 * ```
 *
 * @description
 * Custom DORF field, extending this class, should take care of using both `metadata` and `parentForm` inside HTML template.
 *
 * `@Component()` annotation should be set on the subclass level and then no more annotations inside
 * (e.g. no `@Input()` or `@Output()` on properties).
 * If there is no way to go without additional annotations in subclass, `metadata` and `parentForm` should be listed directly
 * in the subclass once again, with the corresponding `@Input`s annotations.
 *
 * @stable
 */
// TODO: decorator which adds the same behavior as this class?
// tslint:disable-next-line:max-line-length
export abstract class AbstractDorfFieldComponent<T, M extends DorfFieldMetadata<T, DorfFieldDefinition<T>>> implements IDorfFieldDefinition<T> {

    @Input()
    metadata: M;

    constructor(public config: DorfConfigService) { }

    get css() { return this.metadata.css; }

    get key() { return this.metadata.key; }
    get label() { return this.metadata.label; }
    get errorMessage() { return this.metadata.errorMessage; }

    // TODO: is there a way for `touch`? FormControl.markAsTouched is triggered on blur on elemenent with formControl directive
    get invalid() {
        return this.metadata.invalid;
    }

    get formControl() {
        return this.metadata.formControl;
    }
}