import { Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { DorfConfigService } from '../dorf-config.service';
import { DorfMapper, PropertiesToDorfDefinitionsMap } from '../base/dorf-mapper';

import { DorfFieldDefinition } from '../fields/base/abstract-dorf-field.definition';
import { DorfFieldMetadata } from '../fields/base/abstract-dorf-field.metadata';
import { DorfField } from '../fields/base/dorf-field';

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
// TODO: inject dedicated for tests or @Inject or Reflect.metadata with "design:paramtypes" (Injectable) for passing config with @DorfForm
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
 * @whatItDoes Defines options which should be passed to {@link DorfForm} annotation
 * in order to modify the default rendering mechanism.
 *
 * @experimental
 */
export interface IDorfFormOptions {
    /**
     * Number of fields which should be grouped together in a particular form within a section.
     */
    fieldsInSection?: number;

    /**
     * Additional fields represented as tags (array of selectors) or DorfFields or a simple piece of HTML,
     * which should be used within a particular form (inside `dorf-field` template).
     */
    additionalTags?: string | string[] | DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[];

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
// TODO: mixin from TS 2.2; hopefuly it will give us this.form instead of this['form'] in the decorated classes
export function DorfForm(options?: IDorfFormOptions) {
    return function <D extends Function>(targetConstructor: D) {

        let oldNgOnChanges = targetConstructor.prototype.ngOnChanges;
        let originalOnReset = targetConstructor.prototype.onDorfReset;

        let originalOnSubmit = targetConstructor.prototype.onDorfSubmit;
        let originalValidator = targetConstructor.prototype.validator;

        Object.defineProperties(targetConstructor.prototype, {
            fieldsMetadata: {
                get(): DorfFieldMetadata<any, DorfFieldDefinition<any>>[] | DorfFieldMetadata<any, DorfFieldDefinition<any>>[][] {
                    if (this._multipleFieldsInSection) {
                        return this._dividedFieldsMetadata;
                    }
                    return this._fieldsMetadata;
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

                    initMetaForAllFields(this, options);
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
function parseOptionsToTemplate(options?: IDorfFormOptions): string {
    let start = '<section *ngFor="let fieldMeta of fieldsMetadata">';
    // tslint:disable-next-line:max-line-length
    let md = `<dorf-field-wrapper [metadata]="fieldMeta">${options ? parseAdditionalTags('fieldMeta', options.additionalTags) : ''}</dorf-field-wrapper>`;
    let end = '</section>';

    if (options) {
        if (options.renderFieldsetAroundFields) {
            start = `<fieldset [ngClass]="config.css.fieldset">${start}`;
            end += '</fieldset>';
        }
        if (options.fieldsInSection > 1) {
            md = parseForMultipleFieldsInSection(options.additionalTags);
        }
    }
    if (!options || !options.renderWithoutButtons) {
        end += '<dorf-buttons [form]="form" (onDorfSubmit)="onDorfSubmit()" (onDorfReset)="onDorfReset()"></dorf-buttons>';
    }

    return `${start}${md}${end}`;
}

/** @internal */
// tslint:disable-next-line:max-line-length
function parseForMultipleFieldsInSection(additionalTags?: string | string[] | DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[]): string {
    return `<dorf-field-wrapper *ngFor="let meta of fieldMeta; let idx = index" [metadata]="meta">${parseAdditionalTags('meta', additionalTags)}</dorf-field-wrapper>`;
}

/** @internal */
// tslint:disable-next-line:max-line-length
function parseAdditionalTags(metaName?: string, additionalTags?: string | string[] | DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[]): string {
    let result = '';

    if (additionalTags) {
        if (typeof additionalTags === 'string') {
            result += additionalTags;
        } else if (isStringArray(additionalTags)) {
            for (let dorfField of additionalTags) {
                result += parseAdditionalTag(dorfField, metaName);
            }
        } else {
            for (let dorfField of additionalTags) {
                result += parseAdditionalTag(dorfField.tag, metaName);
            }
        }
    }

    return result;
}

/** @internal */
function parseAdditionalTag(tagName: string, metaName: string) {
    return `<${tagName} *ngIf="${metaName}.tag=='${tagName}'" [metadata]="${metaName}"></${tagName}>`
}

/** @internal */
function isStringArray(obj: string | string[] | DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[]): obj is string[] {
    return obj instanceof Array && typeof obj[0] === 'string';
}

/** @internal */
interface ExtendedDorfForm {
    _form: FormGroup;
    _fieldsMetadata: DorfFieldMetadata<any, DorfFieldDefinition<any>>[];
    _multipleFieldsInSection: boolean;
    _dividedFieldsMetadata: DorfFieldMetadata<any, DorfFieldDefinition<any>>[][];

    config: DorfConfigService;
    mapper: DorfMapper;
    validator: ValidatorFn;
    dorfObjectInForm: string;
}

/** @internal */
function initMetaForAllFields(dorfForm: ExtendedDorfForm, options?: IDorfFormOptions) {
    // TODO: using @DorfForm as a function spoils dorfForm parameter (=== undefined); see dorf-form.decorator.spec from tests
    if (!dorfForm || !dorfForm.dorfObjectInForm) {
        throwNoObject();
    }
    let domainObj = dorfForm[dorfForm.dorfObjectInForm];

    if (!domainObj || !domainObj.isDorfObject) {
        throwNoObject();
    }
    dorfForm._fieldsMetadata = dorfForm.mapper.mapObjectWithDefinitionsToFieldsMetadata(domainObj, domainObj.fieldDefinitions);

    dorfForm._multipleFieldsInSection = options && options.fieldsInSection > 1;

    if (dorfForm._multipleFieldsInSection) {
        dorfForm._dividedFieldsMetadata = [];
        let length = dorfForm._fieldsMetadata.length;
        let increment = options.fieldsInSection;
        for (let i = 0; i < (length + length % increment); i += increment) {
            let setOfFields: DorfFieldMetadata<any, DorfFieldDefinition<any>>[] = [];
            for (let j = 0; j < increment && (i + j) < length; ++j) {
                setOfFields.push(dorfForm._fieldsMetadata[i + j]);
            }

            dorfForm._dividedFieldsMetadata.push(setOfFields);
        }
    }
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
}

/** @internal */
function throwNoObject() {
    // tslint:disable-next-line:no-console
    console.info('@DorfObjectInput() has to be either DorfDomainObject or its class has to be annotated as @DorfObject()');
    throw new Error('DorfForm has to contain DorfObject annotated as @DorfObjectInput()');
}
