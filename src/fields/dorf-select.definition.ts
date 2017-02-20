import { IDorfChooseDefinition, DorfChooseDefinition } from './base/dorf-choose.definition';
import { DorfField } from './base/dorf-field';

/**
 * @whatItDoes Represents constructor parameter for {@link DorfSelectDefinition}.
 *
 * @description
 * Definition for radio is an extension of {@link IDorfChooseDefinition}. It contains also a `multiple` flag.
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
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the select field.
 *
 * @stable
 */
export class DorfSelectDefinition<T> extends DorfChooseDefinition<T> implements IDorfSelectDefinition<T> {

    private _multiple: boolean = false;

    constructor(options?: IDorfSelectDefinition<T>) {
        super(options);

        if (options) {
            this._multiple = options.multiple;
        }
    }

    get multiple() { return this._multiple; }

    get tag() { return DorfField.SELECT; }
}
