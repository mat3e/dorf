import { DorfCheckboxDefinition, IDorfCheckboxDefinition } from './dorf-checkbox.definition';
import { DorfFieldMetadata, IDorfFieldMetadata } from './base/abstract-dorf-field.metadata';

/**
 * Represents a [metadata]{@link DorfFieldMetadata} for the checkbox field.
 *
 * @stable
 */
export class DorfCheckboxMetadata<T> extends DorfFieldMetadata<T, IDorfCheckboxDefinition<T>> implements IDorfCheckboxDefinition<T> {
    private _valueBeforeMapping?: T;

    /** @inheritdoc */
    constructor(definition: IDorfCheckboxDefinition<T>, options?: IDorfFieldMetadata<T>) {
        super(definition || new DorfCheckboxDefinition<T>(), options);

        if (options) {
            this._valueBeforeMapping = options.value;
        }
    }

    /** @inheritdoc */
    get mapping() { return this.definition.mapping; }
    /** @inheritdoc */
    get innerLabel() { return this.definition.innerLabel; }
}
