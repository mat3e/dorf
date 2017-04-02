import { IDorfSelectDefinition, DorfSelectDefinition } from './dorf-select.definition';
import { IDorfFieldMetadata } from './base/abstract-dorf-field.metadata';
import { DorfChooseMetadata } from './base/abstract-dorf-choose.metadata';

/**
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the select field.
 *
 * @stable
 */
export class DorfSelectMetadata<T> extends DorfChooseMetadata<T, DorfSelectDefinition<T>> implements IDorfSelectDefinition<T> {

    constructor(definition = new DorfSelectDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get multiple() { return this.definition.multiple; }
}
