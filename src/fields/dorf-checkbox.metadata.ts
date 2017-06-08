import { ICheckboxMapping, IDorfCheckboxDefinition, DorfCheckboxDefinition } from './dorf-checkbox.definition';
import { IDorfFieldMetadata, DorfFieldMetadata } from './base/abstract-dorf-field.metadata';

/**
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the checkbox field.
 *
 * @stable
 */
export class DorfCheckboxMetadata<T> extends DorfFieldMetadata<T, IDorfCheckboxDefinition<T>> implements IDorfCheckboxDefinition<T> {
    private _valueBeforeMapping: T;

    constructor(definition: IDorfCheckboxDefinition<T> = new DorfCheckboxDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);

        if (options) {
            this._valueBeforeMapping = options.value;
        }
    }

    get mapping() { return this.definition.mapping; }
    get innerLabel() { return this.definition.innerLabel; }
}
