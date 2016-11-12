import { OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";

import { DorfService } from "./dorf.service";
import { DorfFieldMetadata } from "./abstract-dorf-field.component";
import { PropertiesToDorfDefinitionsMap, DorfMapper } from "./dorf-mapper";

/**
 * Should be used with details.view.html to create domain object details Component.
 * It should be extended for each Domain Object.
 */
export abstract class AbstractDorfDetailsComponent<T> implements OnInit {

    private _form: FormGroup;
    private _fieldsMetadata: DorfFieldMetadata<any>[];

    /**
     * Method for submitting the form. It should operate on this.form.value.
     */
    abstract onSubmit(): void;

    /**
     * This Component is about exposing details for object returned by this method.
     */
    protected abstract getDomainObject(): T;

    /**
     * DomainObject should return this map.
     */
    protected abstract getFieldDefinitions(): PropertiesToDorfDefinitionsMap<T>;

    /**
     * General form validator, which should check, e.g. business context of the form.
     * Fields might be valid one by one, but not together. E.g. city and country from address.
     */
    protected get validator(): ValidatorFn {
        return Validators.nullValidator;
    }

    /**
     * DorfService should be injected in the subtype's constructor and passed here
     * in order to providing CSS classes to HTNL template.
     */
    constructor(public config: DorfService, private mapper: DorfMapper = new DorfMapper()) { }

    /**
     * Mapping from Domain Object and its PropertiesToDorfDefinitionsMap to form.
     */
    ngOnInit() {
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
        this._fieldsMetadata = this.mapper.mapObjectWithDefinitionsToFieldsMetadata(this.getDomainObject(), this.getFieldDefinitions()).sort((a, b) => a.order - b.order);
    }

    private initFormGroup() {
        let group: { [key: string]: FormControl } = {};

        this._fieldsMetadata.forEach((meta) => {
            let formControl = meta.formControl;
            if (this.config.isDisabled) formControl.disable();

            group[meta.key] = formControl;
        });

        this._form = new FormGroup(group, this.validator);
    }
}