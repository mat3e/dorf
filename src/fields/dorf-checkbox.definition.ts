import { IDorfMultipleLabelsCssClasses } from '../base/dorf-css-classes';

import { IDorfFieldDefinition, DorfFieldDefinition } from './base/abstract-dorf-field.definition';
import { CHECKBOX } from './base/dorf-field';

/**
 * Represents true and false values for checkbox. Should be used when we don't want standard boolean values for the object's property.
 *
 * @example
 * ```
 *
 *  //
 *  @DorfObject()
 *  class TestDomainObject {
 *    @DorfCheckbox<string>({
 *      label: "Is smart?",
 *      mapping: {
 *        trueValue: "yes",
 *        falseValue: "no"
 *      },
 *      updateModelOnChange: true
 *    })
 *    private _smart: string;
 *  }
 * ```
 *
 * @stable
 */
export interface ICheckboxMapping<T> {
    /**
     * Value assigned when checkbox is checked.
     */
    trueValue: T;

    /**
     * Value assigned when checkbox is unchecked.
     */
    falseValue: T;
}

/**
 * Represents constructor parameter for {@link DorfCheckboxDefinition}.
 * Checkbox has an optional [mapping]{@link ICheckboxMapping} property.
 *
 * @stable
 */
export interface IDorfCheckboxDefinition<T> extends IDorfFieldDefinition<T> {
    // more precise type
    /** @inheritdoc */
    css?: IDorfMultipleLabelsCssClasses;

    /**
     * Indicates how to map true and false checkbox values.
     */
    mapping?: ICheckboxMapping<T>;

    /**
     * Label around the field. Checkbox has 2 labels. First standard, as for all other fields; second - around, e.g. as for radio button.
     * It's usually not needed to show both of them.
     */
    innerLabel?: string;
}

/**
 * Represents a [definition]{@link DorfFieldDefinition} for the checkbox field.
 *
 * @stable
 */
export class DorfCheckboxDefinition<T> extends DorfFieldDefinition<T> implements IDorfCheckboxDefinition<T> {

    private _mapping?: ICheckboxMapping<T>;
    private _innerLabel?: string;

    /** @inheritdoc */
    constructor(options?: IDorfCheckboxDefinition<T>) {
        super(options);

        if (options) {
            this._mapping = options.mapping;
            this._innerLabel = options.innerLabel;
        }
    }

    /** @inheritdoc */
    get mapping() { return this._mapping; }
    /** @inheritdoc */
    get innerLabel() { return this._innerLabel; }

    /** @inheritdoc */
    get tag() { return CHECKBOX; }
}
