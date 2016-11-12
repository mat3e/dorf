import { Injectable, Optional } from "@angular/core";

/**
 * Base for DorfModule configuration.
 * All those parameters should be defined once and used in forRoot method from the DorfModule.
 */
export interface IDorfService {
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
export class DorfConfigService implements IDorfService {
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
        }
    }
}

/**
 * Service which is used in all HTML templates. It specifies CSS classes for all important elements.
 * DorfService can also disable forms and prevent their submitting.
 */
@Injectable()
export class DorfService implements IDorfService {
    // TODO: consider putting disabled and classes inside FieldDefinition 
    formClass: string;
    groupingClass: string;

    labelClass: string;
    fieldClass: string;
    errorClass: string;

    isDisabled = false;
    isButtonVisible = true;

    constructor( @Optional() config?: DorfConfigService) {
        if (config) {
            this.formClass = config.formClass;
            this.groupingClass = config.groupingClass;

            this.labelClass = config.labelClass;
            this.fieldClass = config.fieldClass;
            this.errorClass = config.errorClass;
        }
    }
}