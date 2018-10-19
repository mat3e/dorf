import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { isObservable, isPromise } from '../../base/lang-util';
import { DorfFieldDefinition, IDorfFieldDefinition } from './abstract-dorf-field.definition';

/**
 * Represents a type that can be assigned to options of a field.
 *
 * Some fields, like select and radio should have just limited values to choose from.
 * Values may be displayed differently than stored. That's why there is a key and value.
 * Type of the key comes from the {@link DorfFieldDefinition} while value is just a string to be displayed in HTML.
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
 * Represents constructor parameter for {@link DorfChooseDefinition}.
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
     * Can be set later, e.g. in form component, ngOnInit method.
     */
    asyncOptionsToSelect?: Promise<OptionType<T>[]> | Observable<OptionType<T>[]>;
}

/**
 * Represents base {@link DorfFieldDefinition} for the fields with the limited values to choose from.
 *
 * @stable
 */
export abstract class DorfChooseDefinition<T> extends DorfFieldDefinition<T> implements IDorfChooseDefinition<T> {

    private _optionsToSelect?: OptionType<T>[];
    private _asyncOptionsToSelect?: Promise<OptionType<T>[]> | Observable<OptionType<T>[]>;

    /** @inheritdoc */
    constructor(options?: IDorfChooseDefinition<T>) {
        super(options);

        if (options) {
            this._optionsToSelect = options.optionsToSelect;
            this._asyncOptionsToSelect = options.asyncOptionsToSelect;
        }
    }

    /** @inheritdoc */
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

    /** @inheritdoc */
    set asyncOptionsToSelect(asyncOpts: Promise<OptionType<T>[]> | Observable<OptionType<T>[]>) {
        this._optionsToSelect = undefined;
        this._asyncOptionsToSelect = asyncOpts;
    }
}
