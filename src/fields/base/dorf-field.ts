import { DorfCssClasses, IDorfFieldCssClasses, IDorfGeneralCssClasses, IDorfMultipleLabelsCssClasses } from '../../base/dorf-css-classes';
import { IDorfService } from '../../dorf-config.service';

import { CHECKBOX, INPUT, NESTED, RADIO, SELECT } from './constants';
import { DorfDefinitionBase, IDorfDefinitionBase } from './abstract-dorf-field.definition';
import { DorfInputDefinition } from '../dorf-input.definition';
import { DorfRadioDefinition } from '../dorf-radio.definition';
import { DorfSelectDefinition } from '../dorf-select.definition';
import { DorfCheckboxDefinition } from '../dorf-checkbox.definition';
import { AnyMetadata } from './abstract-dorf-field.metadata';
import { DorfInputMetadata } from '../dorf-input.metadata';
import { DorfRadioMetadata } from '../dorf-radio.metadata';
import { DorfSelectMetadata } from '../dorf-select.metadata';
import { DorfCheckboxMetadata } from '../dorf-checkbox.metadata';
import { DorfNestedDefinition } from './dorf-nested.definition';
import { DorfNestedMetadata } from './dorf-nested.metadata';

/**
 * Represents a field in a [mapper]{@link DorfMapper}-friendly form. Defined for all DORF tags.
 *
 * @stable
 */
export interface IDorfField<D extends typeof DorfDefinitionBase, M extends typeof AnyMetadata> {
    /**
     * Unique field identifier. Should be used as Component's selector.
     */
    tag: string;

    // TODO: do we need this?
    definition?: D;
    metadata?: M;

    /**
     * Classes for the current field, to be used in templates.
     */
    css?: IDorfFieldCssClasses | IDorfMultipleLabelsCssClasses;
}

/**
 * Represents a nested field in a [mapper]{@link DorfMapper}-friendly form.
 *
 * @stable
 */
export interface IDorfNestedField extends IDorfField<typeof DorfNestedDefinition, typeof DorfNestedMetadata> {
    /**
     * Nested group may contain e.g. CSS styles specified for internal fields.
     */
    dorfFields?: DorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[];

    /** @inheritdoc */
    css?: IDorfGeneralCssClasses;

    /**
     * Rendering option which defines how many DORF wrappers should be presented inside HTML section.
     */
    columnsNumber?: number;
}

/**
 * Implementation of {@link IDorfField} for faster creation.
 *
 * @stable
 */
export class DorfField<D extends typeof DorfDefinitionBase, M extends typeof AnyMetadata> implements IDorfField<D, M> {
    static INPUT: string = INPUT;
    static RADIO: string = RADIO;
    static SELECT: string = SELECT;
    static CHECKBOX: string = CHECKBOX;
    static NESTED: string = NESTED;

    /** @inheritdoc */
    tag: string;

    // TODO: do we need this?
    definition?: D;
    metadata?: M;

    /** @inheritdoc */
    css?: IDorfFieldCssClasses | IDorfMultipleLabelsCssClasses;

    constructor(options: IDorfField<D, M>) {
        this.tag = options.tag;
        this.definition = options.definition;
        this.metadata = options.metadata;
        this.css = options.css;
    }

    /**
     * Overrides current `DorfField` properties, with given ones.
     *
     * @param target state which is a target one
     */
    updateState(target: IDorfField<D, M>) {
        this.css = new DorfCssClasses(target.css);
        this.definition = target.definition || this.definition;
        this.metadata = target.metadata || this.metadata;
    }

    /**
     * @hidden
     * @internal
     */
    // TODO: generic mechanism for creating DorfTags. Static function as in Angular's makeDecorator
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:member-ordering
    static createNewTag(tagName: string, options: IDorfDefinitionBase<any>): DorfField<typeof DorfDefinitionBase, typeof AnyMetadata> {
        return new DorfField({
            tag: tagName/*,
            definition: null,
            metadata: null,
            css: null*/
        });
    }
}

/**
 * Basic DORF fields.
 *
 * @stable
 */
const DORF_FIELDS: DorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[] = [
    new DorfField({
        tag: INPUT,
        definition: DorfInputDefinition,
        metadata: DorfInputMetadata,
        css: new DorfCssClasses()
    }),
    new DorfField({
        tag: RADIO,
        definition: DorfRadioDefinition,
        metadata: DorfRadioMetadata,
        css: new DorfCssClasses() as IDorfMultipleLabelsCssClasses
    }),
    new DorfField({
        tag: SELECT,
        definition: DorfSelectDefinition,
        metadata: DorfSelectMetadata,
        css: new DorfCssClasses()
    }),
    new DorfField({
        tag: CHECKBOX,
        definition: DorfCheckboxDefinition,
        metadata: DorfCheckboxMetadata,
        css: new DorfCssClasses() as IDorfMultipleLabelsCssClasses
    })
];

/**
 * Method which returns a copy of DORF fields without the nested.
 *
 * @stable
 */
function getDorfFields() {
    let result: IDorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[] = [];

    DORF_FIELDS.forEach((field) => {
        result.push(new DorfField(field));
    });

    return result;
}

/**
 * Special version of {@link DorfField}, which groups others.
 *
 * @stable
 */
export class DorfNestedField extends DorfField<typeof DorfNestedDefinition, typeof DorfNestedMetadata>
    implements IDorfService, IDorfNestedField {

    /** @inheritdoc */
    dorfFields: DorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[];
    /** @inheritdoc */
    css: IDorfGeneralCssClasses;
    /** @inheritdoc */
    columnsNumber: number;

    constructor() {
        super({tag: NESTED});
        this.definition = DorfNestedDefinition;
        this.metadata = DorfNestedMetadata;
        this.css = new DorfCssClasses();
        this.dorfFields = getDorfFields() as DorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[];
    }

    /** @inheritdoc */
    updateState(target: IDorfField<typeof DorfNestedDefinition, typeof DorfNestedMetadata>) {
        this.css = new DorfCssClasses(target.css);
        this.definition = target.definition || this.definition;
        this.metadata = target.metadata || this.metadata;
        this.columnsNumber = (target as any).columnsNumber || this.columnsNumber;

        let fields = (target as any).dorfFields;
        if (fields) {
            fields.forEach((field: IDorfField<typeof DorfDefinitionBase, typeof AnyMetadata>) => {
                setFieldInArray(field, this.dorfFields);
            });
        }
    }
}

/**
 * All the possible fields, availabe out of the box.
 *
 * @stable
 */
const BUILT_IN_FIELDS: DorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[] = DORF_FIELDS.concat(new DorfNestedField());

/**
 * Method which returns a copy of all the possible fields.
 *
 * @stable
 */
export function getBuiltInFields() {
    let result: IDorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[] = [];

    BUILT_IN_FIELDS.forEach((field) => {
        if (field instanceof DorfNestedField) {
            result.push(new DorfNestedField());
        } else {
            result.push(new DorfField(field));
        }
    });

    return result;
}

/**
 * Helper for adding/updating a field within an existing array.
 *
 * @param field field to be added/updated
 * @param dorfFields array which would be modified
 *
 * @stable
 */
export function setFieldInArray(
    field: IDorfField<typeof DorfDefinitionBase, typeof AnyMetadata>,
    dorfFields: DorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[] = []
) {
    let fieldToReplace = getFieldForTagFromArray(field.tag, dorfFields) as DorfField<typeof DorfDefinitionBase, typeof AnyMetadata>;
    if (fieldToReplace) {
        fieldToReplace.updateState(field);
    } else {
        dorfFields.push(new DorfField(field));
    }
}

/**
 * Reading helper.
 *
 * @param tag tag which is to be read
 * @param dorfFields array where to read from
 *
 * @stable
 */
export function getFieldForTagFromArray(
    tag: string,
    dorfFields: IDorfField<typeof DorfDefinitionBase, typeof AnyMetadata>[]
) {
    for (let currField of dorfFields) {
        if (currField.tag === tag) {
            return currField;
        }
    }
}
