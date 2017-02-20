import { IDorfFieldDefinition, DorfFieldDefinition } from './base/dorf-field.definition';
import { DorfField } from './base/dorf-field';

/**
 * @whatItDoes Represents all the possible input types.
 */
// tslint:disable-next-line:max-line-length
export type InputType = 'color' | 'date' | 'datetime' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'range' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';

/**
 * @whatItDoes Represents constructor parameter for {@link DorfInputDefinition}.
 *
 * @description
 * Input has a mandatory [type]{@link InputType} property. It has to support HTML5 types.
 *
 * @stable
 */
export interface IDorfInputDefinition<T> extends IDorfFieldDefinition<T> {
    type: InputType;
}

/**
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the input field.
 *
 * @stable
 */
export class DorfInputDefinition<T> extends DorfFieldDefinition<T> implements IDorfInputDefinition<T> {

    private _type: InputType = 'text';

    constructor(options?: IDorfInputDefinition<T>) {
        super(options);

        if (options) {
            this._type = options.type || this._type;
        }
    }

    get type() { return this._type; }

    get tag() { return DorfField.INPUT; }
}
