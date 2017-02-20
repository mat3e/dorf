import { IDorfFieldDefinition, DorfFieldDefinition } from './dorf-field.definition';

/**
 * @whatItDoes Represents a type that can be assigned to options of a field.
 *
 * @description
 *
 * Some fields, like select and radio should have just limited values to choose from.
 * Values may be displayed differently than stored. That's why there is a key and value.
 * Type of the key comes from the {@link DorfFieldDefinition}
 * while value is just a string to be displayed in HTML.
 *
 * @stable
 */
export interface OptionType<T> {
    /**
     * This is what will be saved in model.
     */
    key: T;
    /**
     * This is what will be shown to the user.
     */
    value: string;
}

/**
 * @whatItDoes Represents constructor parameter for {@link DorfChooseDefinition}.
 *
 * @stable
 */
export interface IDorfChooseDefinition<T> extends IDorfFieldDefinition<T> {
    /**
     * Elements to choose from.
     */
    optionsToSelect: OptionType<T>[];
}

/**
 * @whatItDoes Represents base {@link DorfFieldDefinition} for the fields with the limited values to choose from.
 *
 * @stable
 */
export abstract class DorfChooseDefinition<T> extends DorfFieldDefinition<T> implements IDorfChooseDefinition<T> {

    private _optionsToSelect: OptionType<T>[] = [];

    constructor(options?: IDorfChooseDefinition<T>) {
        super(options);

        if (options) {
            this._optionsToSelect = options.optionsToSelect || this._optionsToSelect;
        }
    }

    get optionsToSelect() { return this._optionsToSelect; }
}
