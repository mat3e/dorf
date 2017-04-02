import { IDorfFieldCssClasses, IDorfMultipleLabelsCssClasses } from '../../base/dorf-css-classes';
import { IDorfFieldDefinition, DorfFieldDefinition } from './abstract-dorf-field.definition';
import { DorfInputDefinition } from '../dorf-input.definition';
import { DorfRadioDefinition } from '../dorf-radio.definition';
import { DorfSelectDefinition } from '../dorf-select.definition';
import { DorfCheckboxDefinition } from '../dorf-checkbox.definition';
import { DorfFieldMetadata } from './abstract-dorf-field.metadata';
import { DorfInputMetadata } from '../dorf-input.metadata';
import { DorfRadioMetadata } from '../dorf-radio.metadata';
import { DorfSelectMetadata } from '../dorf-select.metadata';
import { DorfCheckboxMetadata } from '../dorf-checkbox.metadata';

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
 * @whatItDoes Represents a field in a [mapper]{@link DorfMapper}-friendly form. Stores all default DORF tags.
 *
 * @stable
 */
export class DorfField<D extends typeof DorfFieldDefinition, M extends typeof DorfFieldMetadata> {
    static get INPUT() { return INPUT; }
    static get RADIO() { return RADIO; }
    static get SELECT() { return SELECT; }
    static get CHECKBOX() { return CHECKBOX; }

    /**
     * Unique field identifier. Should be used as Component's selector.
     */
    tag: string;

    // TODO: do we need this?
    definition?: D;
    metadata?: M;

    css?: IDorfFieldCssClasses;

    /** @internal */
    // TODO: generic mechanism for creating DorfTags. Static function as in Angular's makeDecorator
    // tslint:disable-next-line:max-line-length
    static createNewTag(tagName: string, options: IDorfFieldDefinition<any>): DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata> {
        return {
            tag: tagName,
            definition: null,
            metadata: null,
            css: null // new class instance
        };
    }
}

export const BUILT_IN_FIELDS: DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[] = [{
    tag: INPUT,
    definition: DorfInputDefinition,
    metadata: DorfInputMetadata,
    css: {}
}, {
    tag: RADIO,
    definition: DorfRadioDefinition,
    metadata: DorfRadioMetadata,
    css: {} as IDorfMultipleLabelsCssClasses
}, {
    tag: SELECT,
    definition: DorfSelectDefinition,
    metadata: DorfSelectMetadata,
    css: {}
}, {
    tag: CHECKBOX,
    definition: DorfCheckboxDefinition,
    metadata: DorfCheckboxMetadata,
    css: {} as IDorfMultipleLabelsCssClasses
}];
