import { Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { DorfConfigService } from '../dorf-config.service';
import { DorfMapper, PropertiesToDorfDefinitionsMap } from '../dorf-mapper';

import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from '../fields/base/abstract-dorf-field.component';

/**
 * @whatItDoes Optional interface for reminding about form properties.
 *
 *
 * @howToUse
 *
 * [Service]{@link DorfConfigService} named `config` should be injected in the constructor of the implementing class.
 * And other properties may be overriden.
 *
 * ### Example
 *
 * ```
 * @DorfForm()
 * @Component({selector: "test-domain-object-form"})
 * class TestDomainObjectForm implements IDorfForm {
 *   @DorfObjectInput()
 *   private domainObject: Person;
 *
 *   @Output()
 *   createUpdate = new EventEmitter<IModel>();
 *
 *   constructor(public config: DorfConfigService) {}
 *
 *   onSubmit() {
 *     let result = this["form"].value as IPerson;
 *     this.createUpdate.emit(result);
 *   }
 * }
 * ```
 *
 * @description
 * Enforces defining a `config` property which is needed in a class marked as @DorfForm().
 * Contains other useful properties as well.
 *
 * @stable
 */
// TODO: verify inject dedicated for tests or @Inject or Reflect.metadata which returns decorator ("design:paramtypes" to Injectable)
export interface IDorfForm {
    /**
     * Potential, extended [mapper]{@DorfMapper} which will be used for building a form.
     */
    _mapper?: DorfMapper;

    /**
     * Mandatory service, which should be included in a form component built with DORF.
     */
    config: DorfConfigService;

    /**
     * Validates a whole form, in a wider context. E.g. an introduced phone number may be OK as well as a country,
     * but both fields together don't match (e.g. wrong first numbers, not applicable for a particular country).
     */
    validator?: ValidatorFn;

    /**
     * Callback when saving a form.
     */
    onDorfSubmit?: () => void;

    /**
     * Callback when resetting a form.
     */
    onDorfReset?: () => void;
}

/**
 * @whatItDoes Extends {@link Input Angular's Input} and stores property name for future processing by {@link DorfForm}.
 *
 * @howToUse
 *
 * One field should be decorated with @DorfObjectInput() within [@DorfForm()]{@link DorfForm}.
 *
 * ### Example
 *
 * ```
 * @DorfForm()
 * @Component({selector: "test-domain-object-form"})
 * class TestDomainObjectForm implements IDorfForm {
 *   @DorfObjectInput()
 *   private domainObject: Person;
 *
 *   constructor(public config: DorfConfigService)
 * }
 * ```
 *
 * @stable
 * @Annotation
 */
export function DorfObjectInput() {
    return function (targetProto: any, propName: string) {
        Input()(targetProto, propName);
        // formComponent.dorfDomainObjectInForm will store the property name of a domain object
        targetProto.dorfObjectInForm = propName;
    };
}

/**
 * @whatItDoes Defines options which should be passed to {@link DorfForm} annotation.
 *
 * @experimental
 */
export interface IDorfFormOptions {
    // TODO: rendered section should contain this number of fields
    fieldsInSection: number;
    // TODO: should be passed as an inner dorf-field HTML
    additionalFieldsTemplate: string;
}

/**
 * @whatItDoes Superior of {@link AbstractDorfFormComponent}.
 *
 * @howToUse Add `@DorfForm()` annotation over `@Component()` one for the class which should control the form.
 *
 * ### Example
 *
 * ```
 * @DorfForm()
 * @Component({selector: "test-domain-object-form"})
 * class TestDomainObjectForm implements IDorfForm {
 *   @DorfObjectInput()
 *   private domainObject: Person;
 *
 *   constructor(public config: DorfConfigService)
 * }
 * ```
 *
 * @description
 * Adds additional behaviors like building metadata, reacting on changes, submitting the value.
 * If no `template`/`templateUrl` specified in `@Component()`, it adds a default template as well.
 *
 * @experimental
 * @Annotation
 */
// TODO: extending AbstractDorfFormComponent and using its functions here?
export function DorfForm(options?: IDorfFormOptions) {
    return function <D extends Function>(targetConstructor: D) {

        let oldNgOnChanges = targetConstructor.prototype.ngOnChanges;
        let originalOnReset = targetConstructor.prototype.onDorfReset;

        // TODO: get rid of onSubmit, just DORF version should be supported
        let originalOnSubmit = targetConstructor.prototype.onDorfSubmit || targetConstructor.prototype.onSubmit;
        let originalValidator = targetConstructor.prototype.validator;

        Object.defineProperties(targetConstructor.prototype, {
            fieldsMetadata: {
                get() {
                    return this._fieldsMetadata;
                },
                enumerable: true,
                configurable: true
            }, form: {
                get() {
                    return this._form;
                },
                enumerable: true,
                configurable: true
            }, validator: {
                get() {
                    return originalValidator || Validators.nullValidator;
                },
                enumerable: true,
                configurable: true
            }, mapper: {
                get() {
                    if (!this._mapper) {
                        this._mapper = new DorfMapper(this.config);
                    }
                    return this._mapper;
                },
                enumerable: true,
                configurable: true
            }, ngOnChanges: {
                value() {
                    if (oldNgOnChanges) {
                        oldNgOnChanges.call(this);
                    }

                    initMetaForAllFields(this);
                    initFormGroup(this);
                }
            }, onDorfSubmit: {
                value() {
                    if (originalOnSubmit && typeof originalOnSubmit === 'function') {
                        originalOnSubmit.call(this);
                    }
                }
            }, onDorfReset: {
                value() {
                    if (originalOnReset && typeof originalOnReset === 'function') {
                        originalOnReset.call(this);
                    }
                }
            }
        });

        let annotations = (Reflect as any).getMetadata('annotations', targetConstructor) as any[];
        if (annotations && annotations.length) {
            let components = annotations.filter((annotation: any) => {
                return annotation.__proto__ && annotation.__proto__.toString() === '@Component';
            });
            let noTemplateExists = components.every((component: any) => {
                return !component.template && !component.templateUrl;
            });
            if (noTemplateExists && components[0]) {
                components[0].template = `
                <form [ngClass]="config.css.general.form">
                    <fieldset [ngClass]="config.css.general.fieldset">
                        <section *ngFor="let fieldMeta of fieldsMetadata">
                            <dorf-field [metadata]="fieldMeta"></dorf-field>
                        </section>
                    </fieldset>
                    <dorf-buttons [form]="form" (onDorfSubmit)="onDorfSubmit()" (onDorfReset)="onDorfReset()"></dorf-buttons>
                    <ng-content></ng-content>
                </form>
                `;
            }
        }
    };
}

/** @internal */
interface ExtendedDorfForm {
    _form: FormGroup;
    _fieldsMetadata: DorfFieldMetadata<any, DorfFieldDefinition<any>>[];

    config: DorfConfigService;
    mapper: DorfMapper;
    validator: ValidatorFn;
    dorfObjectInForm: string;
}

/** @internal */
function initMetaForAllFields(dorfForm: ExtendedDorfForm) {
    // TODO: using DorfForm as a function spoils dorfForm parameter (=== undefined); see dorf-form.decorator.spec from tests
    if (!dorfForm || !dorfForm.dorfObjectInForm) {
        throwNoObject();
    }
    let domainObj = dorfForm[dorfForm.dorfObjectInForm];

    if (!domainObj || !domainObj.isDorfObject) {
        throwNoObject();
    }
    dorfForm._fieldsMetadata = dorfForm.mapper.mapObjectWithDefinitionsToFieldsMetadata(domainObj, domainObj.fieldDefinitions);
};

/** @internal */
function throwNoObject() {
    // tslint:disable-next-line:no-console
    console.info('@DorfObjectInput() has to be either DorfDomainObject or its class has to be annotated as @DorfObject()');
    throw new Error('DorfForm has to contain DorfObject annotated as @DorfObjectInput()');
}

/** @internal */
function initFormGroup(dorfForm: ExtendedDorfForm) {
    let group: { [key: string]: FormControl } = {};

    dorfForm._fieldsMetadata.forEach((meta: DorfFieldMetadata<any, DorfFieldDefinition<any>>) => {
        let formControl = meta.formControl;

        if (dorfForm.config.isDisabled) {
            formControl.disable();
        }

        group[meta.key] = formControl;
    });

    dorfForm._form = new FormGroup(group, dorfForm.validator);
};

