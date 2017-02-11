import { Injectable, Optional } from '@angular/core';

import { IDorfServiceCss, DorfServiceCss } from './base/dorf-css-classes.model';
import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from './fields/base/abstract-dorf-field.component';

/**
 * @whatItDoes It is a base for {@link DorfModule} configuration.
 *
 * @howToUse Those parameters should be defined in [forRoot]{@link DorfModule#forRoot} method from the {@link DorfModule}.
 *
 * ### Example
 * ```
 * DorfModule.forRoot({
 *   css: {
 *     general: {
 *       form: "pure-form pure-form-aligned",
 *       group: "pure-control-group",
 *       error: "error-message"
 *     }
 *   },
 *   additionalMetadataKinds: [{
 *     tag: StarRatingDefinition.TAG,
 *     definition: StarRatingDefinition,
 *     metadata: StarRatingMetadata
 *   }]
 * })],
 * ```
 *
 * @stable
 */
export interface IDorfService {
    /**
     * List of additional supproted kinds of {@link DorfFieldDefinition}, {@link DofrFieldMetadata} and their tags.
     */
    // TODO: additionalTags/additionalFields
    additionalMetadataKinds?: DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[];

    /**
     * General and field-specific CSS classes.
     */
    css?: IDorfServiceCss;
}

/**
 * @whatItDoes Injectable instance with parameters from {@link IDorfService}.
 *
 * @description
 * It is an `@Optional()`, injectable constructor parameter for {@link DorfConfigService}.
 *
 * @stable
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
 * @whatItDoes It is used in all HTML templates for DORF.
 *
 * @description
 * It specifies CSS classes for all important elements. Can also disable forms and prevent their submitting.
 *
 * @stable
 */
@Injectable()
export class DorfConfigService implements IDorfService {
    additionalMetadataKinds: DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[] = [];
    css: IDorfServiceCss = new DorfServiceCss();

    isDisabled: boolean = false;
    isButtonVisible: boolean = true;

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