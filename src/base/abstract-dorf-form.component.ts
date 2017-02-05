import { OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { DorfConfigService } from '../dorf-config.service';
import { DorfFieldDefinition, DorfFieldMetadata } from '../fields/base/abstract-dorf-field.component';
import { PropertiesToDorfDefinitionsMap, DorfMapper } from '../dorf-mapper';

/**
 * @whatItDoes Should be used with `details.view.html` or a similar template to create a form `Component`.
 *
 * @howToUse
 * This should be a base class for the form `Component`.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   moduleId: module.id,
 *   selector: 'person-details',
 *     templateUrl: '../dorf-details.view.html'
 * })
 * export class PersonDetailComponent extends AbstractDorfFormComponent<Person> {
 *   @Input() domainObject: Person;
 *   @Output() createUpdate = new EventEmitter<IPerson>();
 *
 *   // @Override
 *   protected get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
 *     return Person.fieldDefinitions;
 *   }
 *
 *   constructor(config: DorfConfigService) {
 *     super(config);
 *   }
 *
 *   onSubmit() {
 *     let result = this.form.value as IPerson;
 *     console.log(result);
 *     this.createUpdate.emit(result);
 *   }
 * }
 * ```
 *
 * @description
 * This is the stable way of creating a DORF form, but it should be changed to {@link DorfForm} annotation when possible.
 *
 * @stable
 */
export abstract class AbstractDorfFormComponent<DomObj> implements OnChanges {
    /**
     * It should be an input property in the original `Component`.
     */
    abstract domainObject: DomObj;

    /**
     * DomainObject-specific map. It can be got directly from {@link DorfDomainObject}.
     */
    protected abstract fieldDefinitions: PropertiesToDorfDefinitionsMap<DomObj>;

    /**
     * General form validator, which should check, e.g. a business context of the form and the relations between the fields.
     * E.g. if city and country form values match to each other.
     */
    protected get validator(): ValidatorFn {
        return Validators.nullValidator;
    }

    /** @internal */
    private _form: FormGroup;
    /** @internal */
    private _fieldsMetadata: DorfFieldMetadata<any, DorfFieldDefinition<any>>[];

    /**
     * {@link DorfConfigService} should be injected in the subtype's constructor and passed here
     * in order to provide config for the HTML template.
     */
    constructor(public config: DorfConfigService, private _mapper: DorfMapper = new DorfMapper(config)) { }

    /**
     * Domain Object should be an input property, so each change should rebuild a form.
     */
    ngOnChanges() {
        this.initMetaForAllFields();
        this.initFormGroup();
    }

    /**
     * Returns {@link DorfFieldMetadata} for all the form fields.
     */
    get fieldsMetadata() {
        return this._fieldsMetadata;
    }

    /**
     * Returns a whole form which can be submitted.
     */
    get form() {
        return this._form;
    }

    /** @internal */
    private initMetaForAllFields() {
        this._fieldsMetadata = this._mapper.mapObjectWithDefinitionsToFieldsMetadata(this.domainObject, this.fieldDefinitions);
    }

    /** @internal */
    private initFormGroup() {
        let group: { [key: string]: FormControl } = {};

        this._fieldsMetadata.forEach((meta) => {
            let formControl = meta.formControl;

            if (this.config.isDisabled) {
                formControl.disable();
            }

            group[meta.key] = formControl;
        });

        this._form = new FormGroup(group, this.validator);
    }
}