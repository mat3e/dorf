import { IDorfMultipleLabelsCssClasses } from '../base/dorf-css-classes';

import { IDorfChooseDefinition, DorfChooseDefinition } from './base/abstract-dorf-choose.definition';
import { DorfField } from './base/dorf-field';

/**
 * @whatItDoes Represents constructor parameter for {@link DorfRadioDefinition}.
 *
 * @description
 * Definition for radio is a pure extension of {@link IDorfChooseDefinition}.
 *
 * @stable
 */
export interface IDorfRadioDefinition<T> extends IDorfChooseDefinition<T> {
    // more precise type
    css?: IDorfMultipleLabelsCssClasses;
}

/**
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the radio field.
 *
 * @stable
 */
export class DorfRadioDefinition<T> extends DorfChooseDefinition<T> implements IDorfRadioDefinition<T> {

    constructor(options?: IDorfRadioDefinition<T>) {
        super(options);
    }

    get tag() { return DorfField.RADIO; }
}
