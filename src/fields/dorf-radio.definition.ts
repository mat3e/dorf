import { IDorfMultipleLabelsCssClasses } from '../base/dorf-css-classes';

import { DorfChooseDefinition, IDorfChooseDefinition } from './base/abstract-dorf-choose.definition';
import { RADIO } from './base/dorf-field';

/**
 * Represents constructor parameter for {@link DorfRadioDefinition}.
 * Definition for radio is a pure extension of {@link IDorfChooseDefinition}.
 *
 * @stable
 */
export interface IDorfRadioDefinition<T> extends IDorfChooseDefinition<T> {
    // more precise type
    /** @inheritdoc */
    css?: IDorfMultipleLabelsCssClasses;
}

/**
 * Represents a [definition]{@link DorfFieldDefinition} for the radio field.
 *
 * @stable
 */
export class DorfRadioDefinition<T> extends DorfChooseDefinition<T> implements IDorfRadioDefinition<T> {

    /** @inheritdoc */
    constructor(options?: IDorfRadioDefinition<T>) {
        super(options);
    }

    /** @inheritdoc */
    get tag() { return RADIO; }
}
