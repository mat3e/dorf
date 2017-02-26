import { IDorfFieldDefinition, DorfFieldDefinition } from './base/dorf-field.definition';
import { supportEmbeddedLabel } from './base/dorf-embedded-label.definition';
import { DorfField } from './base/dorf-field';

/**
 * @whatItDoes Represents true and false values for checkbox.
 *
 * @howToUse
 * You should define those values when specifying checkbox definition.
 *
 * ### Example
 *
 * ```
 * @DorfObject()
 * class TestDomainObject {
 *   @DorfCheckbox<string>({
 *     label: "Is smart?",
 *     mapping: {
 *       trueValue: "yes",
 *       falseValue: "no"
 *     },
 *     updateModelOnChange: true
 *   })
 *   private _smart: string;
 * }
 * ```
 *
 * @description
 * Mapping should be used when we don't want standard boolean values for the object's property.
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
 * @whatItDoes Represents constructor parameter for {@link DorfCheckboxDefinition}.
 *
 * @description
 * Checkbox has an optional [mapping]{@link ICheckboxMapping} property.
 *
 * @stable
 */
export interface IDorfCheckboxDefinition<T> extends IDorfFieldDefinition<T> {
    /**
     * Indicates how to map true and false checkbox values.
     */
    mapping?: ICheckboxMapping<T>;
}

/**
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the checkbox field.
 *
 * @stable
 */
export class DorfCheckboxDefinition<T> extends DorfFieldDefinition<T> implements IDorfCheckboxDefinition<T> {

    private _mapping: ICheckboxMapping<T>;

    constructor(options?: IDorfCheckboxDefinition<T>) {
        super(supportEmbeddedLabel(options));

        if (options) {
            this._mapping = options.mapping;
        }
    }

    get mapping() { return this._mapping; }

    get tag() { return DorfField.CHECKBOX; }
}
