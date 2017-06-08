import { Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

import { DorfConfigService } from '../dorf-config.service';
import { DorfMapper, PropertiesToDorfDefinitionsMap } from '../base/dorf-mapper';

import { groupMetadata } from '../fields/base/util';
import { IDorfFieldDefinition, DorfFieldDefinition } from '../fields/base/abstract-dorf-field.definition';
import { DorfNestedMetadata } from '../fields/base/dorf-nested.metadata';
import { IDorfFieldMetadata, DorfFieldMetadata, DorfMetadataBase } from '../fields/base/abstract-dorf-field.metadata';
import { IDorfField, DorfField } from '../fields/base/dorf-field';

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
export interface IDorfForm {
    /**
     * Potential, extended [mapper]{@DorfMapper} which will be used for building a form.
     */
    _mapper?: DorfMapper;

    /**
     * Mandatory service, which should be included in a form component built with DORF.
     */
    // TODO: inject from tests or @Inject or Reflect.metadata with "design:paramtypes" (Injectable) for passing config with @DorfForm
    config: DorfConfigService;

    /**
     * Validates a whole form, in a wider context. E.g. an introduced phone number may be OK as well as a country,
     * but both fields together don't match (e.g. wrong first numbers, not applicable for a particular country).
     */
    validator?: ValidatorFn;

    /**
     * Validates a whole form asynchronously, in a wider context than a single-field validation.
     */
    asyncValidator?: AsyncValidatorFn;

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
 * @whatItDoes Defines options which should be passed to {@link DorfForm} annotation
 * in order to modify the default rendering mechanism.
 *
 * @experimental
 */
export interface IDorfFormOptions {
    /**
     * Additional fields represented as tags (array of selectors) or DorfFields or a simple piece of HTML,
     * which should be used within a particular form (inside `dorf-field` template).
     */
    additionalTags?: string | string[] | IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[];

    /**
     * Indicates if there should be a fieldset around all the fields or not.
     */
    renderFieldsetAroundFields?: boolean;

    /**
     * Indicates if the form should contain buttons.
     */
    renderWithoutButtons?: boolean;
}

/**
 * @whatItDoes Superior of {@link AbstractDorfFormComponent}. Allows to render DORF form which matches provided options.
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
 * @stable
 * @Annotation
 */
// TODO: mixin from TS 2.2 or Object Spread and Rest from 2.1; hopefuly will give this.form instead of this['form'] in the decorated classes
export function DorfForm(options?: IDorfFormOptions) {
    return function <D extends Function>(targetConstructor: D) {

        let oldNgOnChanges = targetConstructor.prototype.ngOnChanges;
        let originalOnReset = targetConstructor.prototype.onDorfReset;

        let originalOnSubmit = targetConstructor.prototype.onDorfSubmit;
        let originalValidator = targetConstructor.prototype.validator;

        Object.defineProperties(targetConstructor.prototype, {
            groupedFieldsMetadata: {
                get(): IDorfFieldMetadata<any>[][] {
                    return this._groupedFieldsMetadata;
                },
                enumerable: true,
                configurable: true
            }, form: {
                get(): FormGroup {
                    return this._form;
                },
                enumerable: true,
                configurable: true
            }, validator: {
                get(): ValidatorFn {
                    return originalValidator || Validators.nullValidator;
                },
                enumerable: true,
                configurable: true
            }, mapper: {
                get(): DorfMapper {
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
                    this._form = createFormGroup(this._fieldsMetadata, this.config.isDisabled, this.validator, this.asyncValidator);
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

        let annotations = (window as any).Reflect.getMetadata('annotations', targetConstructor) as any[];
        if (annotations && annotations.length) {
            let components = annotations.filter((annotation: any) => {
                return annotation.__proto__ && annotation.__proto__.toString() === '@Component';
            });
            let noTemplateExists = components.every((component: any) => {
                return !component.template && !component.templateUrl;
            });
            if (noTemplateExists && components[0]) {
                components[0].template = `
                <form [ngClass]="config.css.form">
                    ${parseOptionsToTemplate(options)}
                    <ng-content></ng-content>
                </form>
                `;
            }
        }
    };
}

/** @internal */
const FIELD_META = 'fieldMeta';

/** @internal */
function parseOptionsToTemplate(options?: IDorfFormOptions): string {
    let start = `
    <ng-container *ngFor="let group of groupedFieldsMetadata">
    <section *ngIf="!group.isGroupingNested" [ngClass]="config.css.section">
    `;
    let md = `
    <dorf-field-wrapper *ngFor="let ${FIELD_META} of group" [metadata]="${FIELD_META}" ${parseNgClassForCss('wrapper')}>
        ${options ? parseAdditionalTags(options.additionalTags) : ''}
    </dorf-field-wrapper>
    `;
    let end = `
    </section>
    <dorf-group-wrapper *ngIf="group.isGroupingNested" [group]="group"></dorf-group-wrapper>
    </ng-container>
    `;

    let renderWithButtons = true;
    if (options) {
        if (options.renderFieldsetAroundFields) {
            start = `<fieldset [ngClass]="config.css.fieldset">${start}`;
            end += '</fieldset>';
        }
        renderWithButtons = !options.renderWithoutButtons;
    }

    if (renderWithButtons) {
        end += '<dorf-buttons [form]="form" (onDorfSubmit)="onDorfSubmit()" (onDorfReset)="onDorfReset()"></dorf-buttons>';
    }

    return `${start}${md}${end}`;
}

/** @internal */
// tslint:disable-next-line:max-line-length
function parseAdditionalTags(additionalTags?: string | string[] | IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[]): string {
    let result = '';

    if (additionalTags) {
        if (typeof additionalTags === 'string') {
            result += additionalTags;
        } else if (isStringArray(additionalTags)) {
            for (let dorfField of additionalTags) {
                result += parseAdditionalTag(dorfField);
            }
        } else {
            for (let dorfField of additionalTags) {
                result += parseAdditionalTag(dorfField.tag);
            }
        }
    }

    return result;
}

/** @internal */
// tslint:disable-next-line:max-line-length
function parseAdditionalTag(tagName: string) {
    return `<${tagName} *ngIf="${FIELD_META}.tag==='${tagName}'" [metadata]="${FIELD_META}" ${parseNgClassForCss('dorfField')}></${tagName}>`;
}

/** @internal */
function parseNgClassForCss(css: string) {
    let fullCss = `css.${css}`;
    return `[ngClass]="${FIELD_META}.getCss('${css}') || config.getCssClassForTag(${FIELD_META}.tag, '${css}')"`;
}

/** @internal */
function isStringArray(obj: string | string[] | IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[]): obj is string[] {
    return obj instanceof Array && typeof obj[0] === 'string';
}

/** @internal */
interface ExtendedDorfForm {
    _form: FormGroup;
    _fieldsMetadata: IDorfFieldMetadata<any>[];
    _groupedFieldsMetadata: (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[];

    config: DorfConfigService;
    mapper: DorfMapper;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    dorfObjectInForm: string;
}

/** @internal */
function initMetaForAllFields(dorfForm: ExtendedDorfForm) {
    // TODO: using @DorfForm as a function spoils dorfForm parameter (=== undefined); see dorf-form.decorator.spec from tests
    if (!dorfForm || !dorfForm.dorfObjectInForm) {
        throwNoObject();
    }
    let domainObj = dorfForm[dorfForm.dorfObjectInForm];

    if (!domainObj || !domainObj.isDorfObject) {
        throwNoObject();
    }

    dorfForm._fieldsMetadata = dorfForm.mapper.mapObjectWithDefinitionsToFieldsMetadata(domainObj, domainObj.fieldDefinitions);
    dorfForm._groupedFieldsMetadata = groupMetadata(dorfForm._fieldsMetadata, dorfForm.config.columnsNumber);
}

/** @internal */
// tslint:disable-next-line:max-line-length
function createFormGroup(metadata: IDorfFieldMetadata<any>[], disabled?: boolean, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
    let group: { [key: string]: AbstractControl } = {};

    metadata.forEach((meta: IDorfFieldMetadata<any>) => {
        let control: AbstractControl;

        if (meta instanceof DorfFieldMetadata) {
            control = meta.formControl;
        } else if (meta instanceof DorfNestedMetadata) {
            // disabled below, so no parameter passing
            control = createFormGroup(meta.nestedFieldsMetadata);
        }

        if (disabled) {
            control.disable();
        }
        group[meta.key] = control;
    });

    return new FormGroup(group, validator, asyncValidator);
}

/** @internal */
function throwNoObject() {
    // tslint:disable-next-line:no-console
    console.info('@DorfObjectInput() has to be either DorfDomainObject or its class has to be annotated as @DorfObject()');
    throw new Error('DorfForm has to contain DorfObject annotated as @DorfObjectInput()');
}
