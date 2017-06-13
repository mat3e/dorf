import { IDorfSelectDefinition, DorfSelectDefinition } from './dorf-select.definition';
import { IDorfFieldMetadata } from './base/abstract-dorf-field.metadata';
import { DorfChooseMetadata } from './base/abstract-dorf-choose.metadata';

/**
 * Represents a [metadata]{@link DorfFieldMetadata} for the select field.
 *
 * @stable
 */
export class DorfSelectMetadata<T> extends DorfChooseMetadata<T, IDorfSelectDefinition<T>> implements IDorfSelectDefinition<T> {

    /** @inheritdoc */
    constructor(definition: IDorfSelectDefinition<T> = new DorfSelectDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    /** @inheritdoc */
    get multiple() { return this.definition.multiple; }
}
