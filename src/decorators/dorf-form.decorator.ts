import { Input } from "@angular/core";
import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";

import { DorfConfigService } from "./../dorf-config.service";
import { DorfMapper, PropertiesToDorfDefinitionsMap } from "../dorf-mapper";

import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from "../fields/base/abstract-dorf-field.component";

/**
 * @whatItDoes Optional interface for reminding about a 'config' property which is needed in a class marked as @DorfForm().
 * Contains also 
 * <ul>
 *   <li>an optional '_mapper' property which should be overriden for a usage of a different mapper (DorfMapper extension)</li>
 *   <li>an optional 'onSubmit' callback which should be overriden if the form actions are needed</li>
 *   <li>an optional 'validator' parameter which should be overriden if the form should be validated in a larger context</li>
 * </ul>
 * 
 * @howToUse
 * 
 * `config` should be injected in the constructor of the class. And other properties may be overriden.
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
 * @stable
 */
// TODO: verify inject dedicated for tests or Reflect.metadata which returns decorator ("design:paramtypes" to Injectable)
export interface IDorfForm {
    _mapper?: DorfMapper;

    config: DorfConfigService;

    validator?: ValidatorFn;

    onSubmit?: () => void;
}

/**
 * @whatItDoes Extends {@link Input Angular's Input} and stores property name for future processing by {@link DorfForm}.
 * 
 * @howToUse
 *
 * One field should be decorated with @DorfObjectInput() within @DorfForm().
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
    }
}

/**
 * @experimental
 */
export function DorfForm() {
    return function <D extends Function>(targetConstructor: D) {

        let oldNgOnChanges = targetConstructor.prototype.ngOnChanges;
        let originalOnSubmit = targetConstructor.prototype.onSubmit;
        let originalValidator = targetConstructor.prototype.validator;

        Object.defineProperties(targetConstructor.prototype, {
            fieldsMetadata: {
                get: function () {
                    return this._fieldsMetadata;
                },
                enumerable: true,
                configurable: true
            }, form: {
                get: function () {
                    return this._form;
                },
                enumerable: true,
                configurable: true
            }, validator: {
                get: function () {
                    return originalValidator || Validators.nullValidator;
                },
                enumerable: true,
                configurable: true
            }, mapper: {
                get: function () {
                    if (!this._mapper) {
                        this._mapper = new DorfMapper(this.config);
                    }
                    return this._mapper;
                },
                enumerable: true,
                configurable: true
            }, ngOnChanges: {
                value: function () {
                    if (oldNgOnChanges) {
                        oldNgOnChanges.call(this);
                    }

                    initMetaForAllFields(this);
                    initFormGroup(this);
                }
            }, onSubmit: {
                value: function () {
                    if (originalOnSubmit && typeof originalOnSubmit === "function") {
                        originalOnSubmit.call(this);
                    }
                }
            }
        });

        let annotations = (Reflect as any).getMetadata("annotations", targetConstructor) as any[];
        if (annotations && annotations.length) {
            let components = annotations.filter((annotation: any) => {
                return annotation.__proto__ && annotation.__proto__.toString() === "@Component";
            });
            let noTemplateExists = components.every((component: any) => {
                return !component.template && !component.templateUrl;
            });
            if (noTemplateExists && components[0]) {
                components[0].template = `
                <form (ngSubmit)="onSubmit()" [ngClass]="config.css.general.form">
                    <fieldset [ngClass]="config.css.general.fieldset">
                        <div *ngFor="let fieldMeta of fieldsMetadata" [ngSwitch]="fieldMeta.tag">
                            <${DorfTag.INPUT} *ngSwitchCase="config.INPUT" [metadata]="fieldMeta" [parentForm]="form"></${DorfTag.INPUT}>
                            <${DorfTag.RADIO} *ngSwitchCase="config.RADIO" [metadata]="fieldMeta" [parentForm]="form"></${DorfTag.RADIO}>
                            <${DorfTag.SELECT} *ngSwitchCase="config.SELECT" [metadata]="fieldMeta" [parentForm]="form"></${DorfTag.SELECT}>
                            <${DorfTag.CHECKBOX} *ngSwitchCase="config.CHECKBOX" [metadata]="fieldMeta" [parentForm]="form"></${DorfTag.CHECKBOX}>
                        </div>
                    </fieldset>
                    <div>
                        <button *ngIf="config.isButtonVisible" type="submit" [disabled]="!form || !form.valid">Save</button>
                    </div>
                </form>
                `;
            }
        }
    }
}

interface ExtendedDorfForm {
    _form: FormGroup;
    _fieldsMetadata: DorfFieldMetadata<any, DorfFieldDefinition<any>>[];

    config: DorfConfigService;
    mapper: DorfMapper;
    validator: ValidatorFn;
    dorfObjectInForm: string;
}

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

function throwNoObject() {
    console.info("@DorfObjectInput() has to be either DorfDomainObject or its class has to be annotated as @DorfObject()");
    throw new Error("DorfForm has to contain DorfObject annotated as @DorfObjectInput()");
}

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

