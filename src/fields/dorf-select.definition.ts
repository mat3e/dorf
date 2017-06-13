import { IDorfChooseDefinition, DorfChooseDefinition } from './base/abstract-dorf-choose.definition';
import { DorfField } from './base/dorf-field';

/**
 * Represents constructor parameter for {@link DorfSelectDefinition}.
 * Definition for select is an extension of {@link IDorfChooseDefinition}. It contains also a `multiple` flag.
 *
 * @stable
 */
export interface IDorfSelectDefinition<T> extends IDorfChooseDefinition<T> {
    /**
     * Indicates if multiselection is possible.
     */
    // when binding to [multiple], the return value is always an array, so *ngIf used in template
    multiple?: boolean;
}

/**
 * Represents a [definition]{@link DorfFieldDefinition} for the select field.
 *
 * @stable
 */
export class DorfSelectDefinition<T> extends DorfChooseDefinition<T> implements IDorfSelectDefinition<T> {

    private _multiple: boolean = false;

    /** @inheritdoc */
    constructor(options?: IDorfSelectDefinition<T>) {
        super(options);

        if (options) {
            this._multiple = options.multiple;
        }
    }

    /** @inheritdoc */
    get multiple() { return this._multiple; }

    /** @inheritdoc */
    get tag() { return DorfField.SELECT; }
}
