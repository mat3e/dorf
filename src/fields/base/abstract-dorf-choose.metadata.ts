import { OptionType, IDorfChooseDefinition, DorfChooseDefinition } from './abstract-dorf-choose.definition';
import { IDorfFieldMetadata, DorfFieldMetadata } from './abstract-dorf-field.metadata';

/**
 * Represents base {@link DorfFieldMetadata} for the fields with the limited values to choose from.
 *
 * @stable
 */
// tslint:disable-next-line:max-line-length
export abstract class DorfChooseMetadata<T, D extends IDorfChooseDefinition<T>> extends DorfFieldMetadata<T, D> implements IDorfChooseDefinition<T> {

    /** @inheritdoc */
    constructor(definition: D, options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    /** @inheritdoc */
    get optionsToSelect() { return this.definition.optionsToSelect; }
}
