import { Injectable, Optional } from '@angular/core';

import { IDorfCommonCssClasses, IDorfGeneralWithButtonsCssClasses, DorfCssClasses } from './base/dorf-css-classes';

import {
    IDorfField,
    DorfField,
    IDorfNestedField,
    DorfNestedField,
    setFieldInArray,
    getFieldForTagFromArray,
    getBuiltInFields
} from './fields/base/dorf-field';
import { IDorfFieldDefinition } from './fields/base/abstract-dorf-field.definition';
import { DorfMetadataBase } from './fields/base/abstract-dorf-field.metadata';

/**
 * It is a base for {@link DorfModule} configuration.
 * Parameters should be provided in [forRoot]{@link DorfModule#forRoot} method from the {@link DorfModule}.
 *
 * @example
 * ```
 *
 *  //
 *  DorfModule.forRoot({
 *    css: {
 *      general: {
 *        form: "pure-form pure-form-aligned",
 *        group: "pure-control-group",
 *        error: "error-message"
 *      }
 *    },
 *    additionalFields: [{
 *      tag: StarRatingDefinition.TAG,
 *      definition: StarRatingDefinition,
 *      metadata: StarRatingMetadata
 *    }]
 *  })],
 * ```
 *
 * @stable
 */
export interface IDorfService {
    /**
     * List of supproted fields defined by {@link DorfFieldDefinition}, {@link DorfFieldMetadata}, css and tags.
     */
    dorfFields?: (IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase> | IDorfNestedField)[];

    /**
     * General and field-specific CSS classes.
     */
    css?: IDorfGeneralWithButtonsCssClasses;

    /**
     * Form can be rendered with multiple columns. Number of fields within the section should be specified here.
     */
    columnsNumber?: number;
}

/**
 * Injectable instance with parameters from {@link IDorfService}.
 * It is an `@Optional()`, injectable constructor parameter for {@link DorfConfigService}.
 *
 * @stable
 */
export class DorfSupportingService implements IDorfService {
    /** @inheritdoc */
    dorfFields?: (IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase> | IDorfNestedField)[];
    /** @inheritdoc */
    css?: IDorfGeneralWithButtonsCssClasses;
    /** @inheritdoc */
    columnsNumber?: number;

    constructor(options?: IDorfService) {
        if (options) {
            this.dorfFields = options.dorfFields;
            this.css = options.css;
            this.columnsNumber = options.columnsNumber;
        }
    }
}

/**
 * It is used in all DORF HTML templates and field compoenents for modyfing fields behavior.
 * Specifies CSS classes for all important elements.
 * It can also disable forms and this is an entry point where additional fields needs to be specified.
 *
 * @stable
 */
@Injectable()
export class DorfConfigService implements IDorfService {
    /** @inheritdoc */
    dorfFields: DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[]
    = getBuiltInFields() as DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[];
    /** @inheritdoc */
    css: IDorfGeneralWithButtonsCssClasses = new DorfCssClasses();
    /** @inheritdoc */
    columnsNumber: number = 1;

    /**
     * Allows changing form state to disable. Should be set inside field component's constructor.
     */
    isDisabled: boolean = false;

    constructor( @Optional() config?: DorfSupportingService) {
        if (config) {
            this.css = config.css ? new DorfCssClasses(config.css) : this.css;
            this.columnsNumber = config.columnsNumber || this.columnsNumber;

            if (config.dorfFields) {
                config.dorfFields.forEach((field) => {
                    this.setField(field);
                })
            }
        }
    }

    /**
     * Returns the css classes from the service perspective, when tag is nested in group.
     * Priority of classes is always the same:
     * <ol>
     * <li>direct css from metadata</li>
     * <li>css from group</li>
     * <li>css from field definition within the group in config service</li>
     * <li>css from group in config service</li>
     * <li>css from field definition in config service</li>
     * <li>css from config service</li>
     * </ol>
     */
    getCssClassForNestedTag(tag: string, cssClass: string) {
        let nested = this.getFieldForTag(DorfField.NESTED) as DorfNestedField;
        let tagCssInNested = nested.dorfFields.find((field) => field.tag === tag).css;
        return tagCssInNested[cssClass] || nested.css[cssClass] || this.getCssClassForTag(tag, cssClass);
    }

    /**
     * Returns the css classes from the service perspective for a given tag.
     * Priority of classes is always the same:
     * <ol>
     * <li>direct css from metadata</li>
     * <li>css from group</li>
     * <li>css from field definition within the group in config service</li>
     * <li>css from group in config service</li>
     * <li>css from field definition in config service</li>
     * <li>css from config service</li>
     * </ol>
     */
    getCssClassForTag(tag: string, cssClass: string) {
        return this.getFieldForTag(tag).css[cssClass] || this.css[cssClass];
    }

    /**
     * Method for overriding existing DORF field or for adding a totally new one.
     */
    // TODO: verify possibility of overriding metadata and definition
    setField(field: IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>) {
        setFieldInArray(field, this.dorfFields);
    }

    /**
     * Method for retrieving DORF field from the built in and registered ones.
     */
    getFieldForTag(tag: string) {
        return getFieldForTagFromArray(tag, this.dorfFields);
    }
}
