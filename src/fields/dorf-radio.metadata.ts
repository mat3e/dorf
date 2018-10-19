import { DorfRadioDefinition, IDorfRadioDefinition } from './dorf-radio.definition';
import { IDorfFieldMetadata } from './base/abstract-dorf-field.metadata';
import { DorfChooseMetadata } from './base/abstract-dorf-choose.metadata';

/**
 * Represents a [metadata]{@link DorfFieldMetadata} for the radio field.
 *
 * @stable
 */
export class DorfRadioMetadata<T> extends DorfChooseMetadata<T, IDorfRadioDefinition<T>> implements IDorfRadioDefinition<T> {

    /** @inheritdoc */
    constructor(definition: IDorfRadioDefinition<T>, options?: IDorfFieldMetadata<T>) {
        super(definition || new DorfRadioDefinition<T>(), options);
    }
}
