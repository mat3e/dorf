import { Injectable, Optional } from '@angular/core';

import { DorfFieldCssClasses, IDorfGeneralCssClasses, DorfGeneralCssClasses } from './base/dorf-css-classes';

import { BUILT_IN_FIELDS, DorfField } from './fields/base/dorf-field';
import { DorfFieldDefinition } from './fields/base/dorf-field.definition';
import { DorfFieldMetadata } from './fields/base/dorf-field.metadata';

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
 *   additionalFields: [{
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
     * List of supproted fields defined by {@link DorfFieldDefinition}, {@link DofrFieldMetadata}, css and tags.
     */
    dorfFields?: DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[];

    /**
     * General and field-specific CSS classes.
     */
    css?: IDorfGeneralCssClasses;
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
    dorfFields?: DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[];
    css?: IDorfGeneralCssClasses;

    constructor(options?: IDorfService) {
        if (options) {
            this.dorfFields = options.dorfFields;
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
    dorfFields: DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[] = BUILT_IN_FIELDS;
    css: IDorfGeneralCssClasses = new DorfGeneralCssClasses();

    isDisabled: boolean = false;

    constructor( @Optional() config?: DorfSupportingService) {
        if (config) {
            this.css = config.css ? new DorfGeneralCssClasses(config.css) : this.css;

            if (config.dorfFields) {
                config.dorfFields.forEach((field) => {
                    let existing = this.getFieldForTag(field.tag);
                    if (!existing) {
                        this.dorfFields.push(field);
                    } else {
                        existing.css = new DorfFieldCssClasses(field.css);
                        existing.definition = field.definition || existing.definition;
                        existing.metadata = field.metadata || existing.metadata;
                    }
                })
            }
        }
    }

    setFieldForTag(tag: string, field: DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>) {
        let fieldToReplace = this.getFieldForTag(tag);
        if (fieldToReplace) {
            fieldToReplace.css = new DorfFieldCssClasses(field.css);
            fieldToReplace.definition = field.definition || fieldToReplace.definition;
            fieldToReplace.metadata = field.metadata || fieldToReplace.metadata;
        }
    }

    getFieldForTag(tag: string) {
        for (let currField of this.dorfFields) {
            if (currField.tag === tag) {
                return currField;
            }
        }
    }
}