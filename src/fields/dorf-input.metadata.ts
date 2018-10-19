import { DorfInputDefinition, IDorfInputDefinition } from './dorf-input.definition';
import { DorfFieldMetadata, IDorfFieldMetadata } from './base/abstract-dorf-field.metadata';

/**
 * Represents a [metadata]{@link DorfFieldMetadata} for the input field.
 *
 * @stable
 */
export class DorfInputMetadata<T> extends DorfFieldMetadata<T, IDorfInputDefinition<T>> implements IDorfInputDefinition<T> {

    /** @inheritdoc */
    constructor(definition: IDorfInputDefinition<T>, options?: IDorfFieldMetadata<T>) {
        super(definition || new DorfInputDefinition<T>(), options);
    }

    /** @inheritdoc */
    get type() { return this.definition.type; }
}
