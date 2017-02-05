import { Component } from '@angular/core';

import { DorfConfigService } from '../dorf-config.service';

import {
    DorfTag,
    IDorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldDefinition,
    DorfFieldMetadata,
    AbstractDorfFieldComponent
} from './base/abstract-dorf-field.component';

import {
    IDorfChooseDefinition,
    DorfChooseDefinition,
    DorfChooseMetadata,
    DorfChooseComponent
} from './base/abstract-dorf-choose.component';

/**
 * @whatItDoes Represents constructor parameter for {@link DorfRadioDefinition}.
 *
 * @description
 * Definition for radio is a pure extension of {@link IDorfChooseDefinition}.
 *
 * @stable
 */
export interface IDorfRadioDefinition<T> extends IDorfChooseDefinition<T> { }

/**
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the radio field.
 *
 * @stable
 */
export class DorfRadioDefinition<T> extends DorfChooseDefinition<T> implements IDorfRadioDefinition<T> {

    constructor(options?: IDorfRadioDefinition<T>) {
        super(options);
    }

    get tag() { return DorfTag.RADIO; }
}

/**
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the radio field.
 *
 * @stable
 */
export class DorfRadioMetadata<T> extends DorfChooseMetadata<T, DorfRadioDefinition<T>> implements IDorfRadioDefinition<T> {

    constructor(definition = new DorfRadioDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }
}

/**
 * @whatItDoes DORF radio field which consumes {@link DorfRadioMetadata} for rendering.
 *
 * @description
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: DorfTag.RADIO,
    templateUrl: './dorf-radio.component.html'
})
export class DorfRadioComponent<T> extends DorfChooseComponent<T, DorfRadioMetadata<T>> implements IDorfRadioDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }
}