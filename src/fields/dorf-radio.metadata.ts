import { IDorfRadioDefinition, DorfRadioDefinition } from './dorf-radio.definition';
import { IDorfFieldMetadata } from './base/abstract-dorf-field.metadata';
import { DorfChooseMetadata } from './base/abstract-dorf-choose.metadata';

/**
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the radio field.
 *
 * @stable
 */
export class DorfRadioMetadata<T> extends DorfChooseMetadata<T, IDorfRadioDefinition<T>> implements IDorfRadioDefinition<T> {

    constructor(definition: IDorfRadioDefinition<T> = new DorfRadioDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }
}
