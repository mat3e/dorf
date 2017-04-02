import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { isPromise, isObservable } from '../../base/lang-util';
import { IDorfFieldDefinition, DorfFieldDefinition } from './abstract-dorf-field.definition';

/**
 * @whatItDoes Represents a type that can be assigned to options of a field.
 *
 * @description
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
 * @howToUse
 * Definition should always contain either `optionsToSelect` or `asyncOptionsToSelect`.
 *
 * @stable
 */
export interface IDorfChooseDefinition<T> extends IDorfFieldDefinition<T> {
    /**
     * Elements to choose from.
     */
    optionsToSelect?: OptionType<T>[];

    /**
     * Asynchronous options to be assigned to the field.
     */
    asyncOptionsToSelect?: Promise<OptionType<T>[]> | Observable<OptionType<T>[]>;
}

/**
 * @whatItDoes Represents base {@link DorfFieldDefinition} for the fields with the limited values to choose from.
 *
 * @stable
 */
export abstract class DorfChooseDefinition<T> extends DorfFieldDefinition<T> implements IDorfChooseDefinition<T> {

    private _optionsToSelect: OptionType<T>[];
    private _asyncOptionsToSelect: Promise<OptionType<T>[]> | Observable<OptionType<T>[]>;

    constructor(options?: IDorfChooseDefinition<T>) {
        super(options);

        if (options) {
            this._optionsToSelect = options.optionsToSelect;
            this._asyncOptionsToSelect = options.asyncOptionsToSelect;
        }
    }

    get optionsToSelect() {
        if (!this._optionsToSelect) {
            let obs = isPromise(this._asyncOptionsToSelect) ? fromPromise(this._asyncOptionsToSelect) : this._asyncOptionsToSelect;
            if (!(isObservable(obs))) {
                throw new Error(`Expected 'asyncOptionsToSelect' to be Promise or Observable when no 'optionsToSelect' specified`);
            }
            obs.subscribe((next: OptionType<T>[]) => { this._optionsToSelect = next; });
        }
        return this._optionsToSelect;
    }
}