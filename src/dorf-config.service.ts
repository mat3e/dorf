import { Injectable, Optional } from "@angular/core";

import { IDorfServiceCss, DorfServiceCss } from "./base/dorf-css-classes.model"
import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from "./fields/base/abstract-dorf-field.component";

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
     * General and field-default CSS classes.
     */
    css?: IDorfServiceCss;
}

/**
 * Service which should be provided as a parameter of DorfModule.forRoot method.
 */
export class DorfSupportingService implements IDorfService {
    additionalMetadataKinds?: DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[];
    css?: IDorfServiceCss;

    constructor(options: IDorfService) {
        if (options) {
            this.additionalMetadataKinds = options.additionalMetadataKinds;
            this.css = options.css;
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
    css: IDorfServiceCss = new DorfServiceCss();

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
            this.css = config.css ? new DorfServiceCss(config.css) : this.css;
        }
    }
}