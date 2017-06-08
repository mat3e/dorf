import { IDorfGeneralCssClasses } from '../../base/dorf-css-classes';
import { DorfField } from './dorf-field';
import { IDorfDefinitionBase, DorfDefinitionBase } from './abstract-dorf-field.definition';

/**
 * @whatItDoes Definition type for the nested DORF object.
 *
 * @description
 * Specifies how the group for the nested object should be rendered.
 *
 * @stable
 */
export interface IDorfNestedDefinition<T> extends IDorfDefinitionBase<T> {
    css?: IDorfGeneralCssClasses;

    /**
     * Indicates if fields from the nested object shouldn't or should be presented in a separate group.
     */
    transparentFlow?: boolean;

    /**
     * Indicates how many columns should be rendered in a separate group for a nested object.
     */
    columnsNumber?: number;
}

/**
 * @whatItDoes Nested field definition implementation.
 */
export class DorfNestedDefinition<T> extends DorfDefinitionBase<T> implements IDorfNestedDefinition<T> {
    private _transparentFlow: boolean;
    private _columnsNumber: number = 2;

    constructor(options?: IDorfNestedDefinition<T>) {
        super(options);

        if (options) {
            this._transparentFlow = options.transparentFlow;
            this._columnsNumber = options.columnsNumber || this._columnsNumber;
        }
    }

    get tag() { return DorfField.NESTED; }

    get transparentFlow() { return this._transparentFlow; }
    get columnsNumber() { return this._columnsNumber; }
}