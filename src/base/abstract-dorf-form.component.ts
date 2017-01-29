import { OnChanges } from "@angular/core";
import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";

import { DorfConfigService } from "../dorf-config.service";
import { DorfFieldDefinition, DorfFieldMetadata } from "../fields/base/abstract-dorf-field.component";
import { PropertiesToDorfDefinitionsMap, DorfMapper } from "../dorf-mapper";

/**
 * Should be used with details.view.html to create domain object details Component.
 * It should be extended for each Domain Object.
 */
export abstract class AbstractDorfFormComponent<T> implements OnChanges {
    // @Input
    abstract domainObject: T;

    /**
     * DomainObject-specific map.
     */
    protected abstract fieldDefinitions: PropertiesToDorfDefinitionsMap<T>;

    /**
     * General form validator, which should check, e.g. business context of the form.
     * Fields might be valid one by one, but not together. E.g. city and country from address.
     */
    protected get validator(): ValidatorFn {
        return Validators.nullValidator;
    }

    private _form: FormGroup;
    private _fieldsMetadata: DorfFieldMetadata<any, DorfFieldDefinition<any>>[];

    /**
     * DorfService should be injected in the subtype's constructor and passed here
     * in order to providing CSS classes to HTML template.
     */
    constructor(public config: DorfConfigService, private _mapper: DorfMapper = new DorfMapper(config)) { }

    /**
     * Domain Object should be an input property, so each change should rebuild form.
     */
    ngOnChanges() {
        this.initMetaForAllFields();
        this.initFormGroup();
    }

    /**
     * Returns FieldMetadata for all the form fields.
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

    private initMetaForAllFields() {
        this._fieldsMetadata = this._mapper.mapObjectWithDefinitionsToFieldsMetadata(this.domainObject, this.fieldDefinitions);
    }

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