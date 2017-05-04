import {
    IDorfFieldCssClasses,
    IDorfMultipleLabelsCssClasses,
    IDorfGeneralCssClasses,
    DorfCssClasses
} from '../../base/dorf-css-classes';
import { IDorfService } from '../../dorf-config.service';

import { IDorfFieldDefinition } from './abstract-dorf-field.definition';
import { DorfInputDefinition } from '../dorf-input.definition';
import { DorfRadioDefinition } from '../dorf-radio.definition';
import { DorfSelectDefinition } from '../dorf-select.definition';
import { DorfCheckboxDefinition } from '../dorf-checkbox.definition';
import { DorfMetadataBase, DorfFieldMetadata } from './abstract-dorf-field.metadata';
import { DorfInputMetadata } from '../dorf-input.metadata';
import { DorfRadioMetadata } from '../dorf-radio.metadata';
import { DorfSelectMetadata } from '../dorf-select.metadata';
import { DorfCheckboxMetadata } from '../dorf-checkbox.metadata';
import { DorfNestedDefinition } from './dorf-nested.definition';
import { DorfNestedMetadata } from './dorf-nested.metadata';

/**
 * Unique id for input.
 */
const INPUT: string = 'dorf-input';
/**
 * Unique id for radio.
 */
const RADIO: string = 'dorf-radio';
/**
 * Unique id for select.
 */
const SELECT: string = 'dorf-select';
/**
 * Unique id for checkbox.
 */
const CHECKBOX: string = 'dorf-checkbox';
/**
 * Identifier for a nested object.
 */
const NESTED: string = 'dorf-nested-object';

/**
 * @whatItDoes Represents a field in a [mapper]{@link DorfMapper}-friendly form. Defined for all DORF tags.
 *
 * @stable
 */
export interface IDorfField<D extends IDorfFieldDefinition<any>, M extends typeof DorfMetadataBase> {
    /**
     * Unique field identifier. Should be used as Component's selector.
     */
    tag: string;

    // TODO: do we need this?
    definition?: D;
    metadata?: M;

    css?: IDorfFieldCssClasses | IDorfMultipleLabelsCssClasses;
}

/**
 * @whatItDoes Represents a nested field in a [mapper]{@link DorfMapper}-friendly form.
 *
 * @stable
 */
export interface IDorfNestedField extends IDorfField<DorfNestedDefinition<any>, typeof DorfNestedMetadata> {
    dorfFields?: DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[];
    css?: IDorfGeneralCssClasses;
    columnsNumber?: number;
}

/**
 * @whatItDoes Implementation of {@link IDorfField} for faster creation.
 *
 * @stable
 */
export class DorfField<D extends IDorfFieldDefinition<any>, M extends typeof DorfMetadataBase> implements IDorfField<D, M> {
    static get INPUT() { return INPUT; }
    static get RADIO() { return RADIO; }
    static get SELECT() { return SELECT; }
    static get CHECKBOX() { return CHECKBOX; }
    static get NESTED() { return NESTED; }

    tag: string;

    // TODO: do we need this?
    definition?: D;
    metadata: M;

    css: IDorfFieldCssClasses | IDorfMultipleLabelsCssClasses;

    constructor(options: IDorfField<D, M>) {
        this.tag = options.tag;
        this.definition = options.definition;
        this.metadata = options.metadata;
        this.css = options.css || new DorfCssClasses();
    }

    updateState(target: IDorfField<D, M>) {
        this.css = new DorfCssClasses(target.css);
        this.definition = target.definition || this.definition;
        this.metadata = target.metadata || this.metadata;
    }

    /** @internal */
    // TODO: generic mechanism for creating DorfTags. Static function as in Angular's makeDecorator
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:member-ordering
    static createNewTag(tagName: string, options: IDorfFieldDefinition<any>): DorfField<IDorfFieldDefinition<any>, typeof DorfFieldMetadata> {
        return new DorfField({
            tag: tagName,
            definition: null,
            metadata: null,
            css: null
        });
    }
}

/**
 * Basic DORF fields.
 *
 * @stable
 */
const DORF_FIELDS: DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[] = [
    new DorfField({
        tag: INPUT,
        definition: DorfInputDefinition,
        metadata: DorfInputMetadata,
        css: {}
    }),
    new DorfField({
        tag: RADIO,
        definition: DorfRadioDefinition,
        metadata: DorfRadioMetadata,
        css: {} as IDorfMultipleLabelsCssClasses
    }),
    new DorfField({
        tag: SELECT,
        definition: DorfSelectDefinition,
        metadata: DorfSelectMetadata,
        css: {}
    }),
    new DorfField({
        tag: CHECKBOX,
        definition: DorfCheckboxDefinition,
        metadata: DorfCheckboxMetadata,
        css: {} as IDorfMultipleLabelsCssClasses
    })
];

/**
 * Method which returns a copy of DORF fields without nested.
 *
 * @stable
 */
function getDorfFields() {
    let result: IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[] = [];

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
export class DorfNestedField extends DorfField<DorfNestedDefinition<any>, typeof DorfNestedMetadata>
    implements IDorfService, IDorfNestedField {

    dorfFields: DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[];
    css: IDorfGeneralCssClasses;
    columnsNumber: number;

    constructor() {
        super({ tag: NESTED });
        this.definition = new DorfNestedDefinition();
        this.metadata = DorfNestedMetadata;
        this.css = new DorfCssClasses();
        this.dorfFields = getDorfFields() as DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[];
    }

    /* @Override */
    updateState(target: IDorfField<DorfNestedDefinition<any>, typeof DorfNestedMetadata>) {
        this.css = new DorfCssClasses(target.css);
        this.definition = target.definition || this.definition;
        this.metadata = target.metadata || this.metadata;
        this.columnsNumber = (target as any).columnsNumber || this.columnsNumber;

        let fields = (target as any).dorfFields;
        if (fields) {
            fields.forEach((field: IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>) => {
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
const BUILT_IN_FIELDS: DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[] = DORF_FIELDS.concat(new DorfNestedField());

/**
 * Method which returns a copy of all the possible fields.
 *
 * @stable
 */
export function getBuiltInFields() {
    let result: (IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase> | IDorfNestedField)[] = [];

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
 * @stable
 */
export function setFieldInArray(
    field: IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>,
    dorfFields: DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[] = []
) {
    let fieldToReplace = getFieldForTagFromArray(field.tag, dorfFields) as DorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>;
    if (fieldToReplace) {
        fieldToReplace.updateState(field);
    } else {
        dorfFields.push(new DorfField(field));
    }
}

/**
 * Reading helper.
 *
 * @stable
 */
export function getFieldForTagFromArray(
    tag: string,
    dorfFields: IDorfField<IDorfFieldDefinition<any>, typeof DorfMetadataBase>[]
) {
    for (let currField of dorfFields) {
        if (currField.tag === tag) {
            return currField;
        }
    }
}