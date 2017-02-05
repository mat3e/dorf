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
 * @whatItDoes Represents constructor parameter for {@link DorfSelectDefinition}.
 *
 * @description
 * Definition for radio is an extension of {@link IDorfChooseDefinition}. It contains also a `multiple` flag.
 *
 * @stable
 */
export interface IDorfSelectDefinition<T> extends IDorfChooseDefinition<T> {
    /**
     * Indicates if multiselection is possible.
     */
    // when binding to [multiple], the return value is always an array, so *ngIf used in template
    multiple?: boolean;
}

/**
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the select field.
 *
 * @stable
 */
export class DorfSelectDefinition<T> extends DorfChooseDefinition<T> implements IDorfSelectDefinition<T> {

    private _multiple: boolean = false;

    constructor(options?: IDorfSelectDefinition<T>) {
        super(options);

        if (options) {
            this._multiple = options.multiple;
        }
    }

    get multiple() { return this._multiple; }

    get tag() { return DorfTag.SELECT; }
}

/**
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the select field.
 *
 * @stable
 */
export class DorfSelectMetadata<T> extends DorfChooseMetadata<T, DorfSelectDefinition<T>> implements IDorfSelectDefinition<T> {

    constructor(definition = new DorfSelectDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get multiple() { return this.definition.multiple; }
}

/**
 * @whatItDoes DORF select field which consumes {@link DorfSelectMetadata} for rendering.
 *
 * @description
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: DorfTag.SELECT,
    templateUrl: './dorf-select.component.html'
})
export class DorfSelectComponent<T> extends DorfChooseComponent<T, DorfSelectMetadata<T>> implements IDorfSelectDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get multiple() { return this.metadata.multiple; }
}