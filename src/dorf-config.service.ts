import { Injectable, Optional } from "@angular/core";

import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from "./fields/abstract-dorf-field.component";

/**
 * Base for DorfModule configuration.
 * All those parameters should be defined once and used in forRoot method from the DorfModule.
 */
export interface IDorfService {
    /**
     * List of additional supproted kinds of DorfFieldDefinition, DofrFieldMetadata and tags.
     */
    additionalMetadataKinds?: DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[];

    /**
     * CSS class for a whole form.
     */
    formClass?: string;

    /**
     * CSS class for a div, which contain field, label and error message.
     */
    groupingClass?: string;

    /**
     * CSS class for a DorfField label.
     */
    labelClass?: string;

    /**
     * CSS for a DorfField in general.
     */
    fieldClass?: string;

    /**
     * CSS for a DorfField-related error.
     */
    errorClass?: string;
}

/**
 * Service which should be provided as a parameter of DorfModule.forRoot method.
 */
export class DorfSupportingService implements IDorfService {
    additionalMetadataKinds?: DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[];

    formClass?: string;
    groupingClass?: string;

    labelClass?: string;
    fieldClass?: string;
    errorClass?: string;

    constructor(options: IDorfService) {
        if (options) {
            this.formClass = options.formClass;
            this.groupingClass = options.groupingClass;
            this.labelClass = options.labelClass;
            this.fieldClass = options.fieldClass;
            this.errorClass = options.errorClass;
            this.additionalMetadataKinds = options.additionalMetadataKinds;
        }
    }
}

/**
 * Service which is used in all HTML templates. It specifies CSS classes for all important elements.
 * DorfService can also disable forms and prevent their submitting.
 */
@Injectable()
export class DorfConfigService implements IDorfService {
    additionalMetadataKinds: DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[] = [];

    // TODO: consider putting disabled and classes inside FieldDefinition 
    formClass: string;
    groupingClass: string;

    labelClass: string;
    fieldClass: string;
    errorClass: string;

    isDisabled = false;
    isButtonVisible = true;

    /*
    Properties to be used in templates, where service is usually available as 'config'.
    */
    get INPUT() {
        return DorfTag.INPUT;
    }
    get RADIO() {
        return DorfTag.RADIO;
    }
    get SELECT() {
        return DorfTag.SELECT;
    }
    get CHECKBOX() {
        return DorfTag.CHECKBOX;
    }

    constructor( @Optional() config?: DorfSupportingService) {
        if (config) {
            this.additionalMetadataKinds = config.additionalMetadataKinds || this.additionalMetadataKinds;

            this.formClass = config.formClass;
            this.groupingClass = config.groupingClass;

            this.labelClass = config.labelClass;
            this.fieldClass = config.fieldClass;
            this.errorClass = config.errorClass;
        }
    }
}