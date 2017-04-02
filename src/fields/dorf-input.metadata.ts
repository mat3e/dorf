import { IDorfInputDefinition, DorfInputDefinition } from './dorf-input.definition';
import { IDorfFieldMetadata, DorfFieldMetadata } from './base/abstract-dorf-field.metadata';

/**
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the input field.
 *
 * @stable
 */
export class DorfInputMetadata<T> extends DorfFieldMetadata<T, DorfInputDefinition<T>> implements IDorfInputDefinition<T> {

    constructor(definition = new DorfInputDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get type() { return this.definition.type; }
}
