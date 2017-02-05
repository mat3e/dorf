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

/**
 * @whatItDoes Represents all the possible input types.
 */
// tslint:disable-next-line:max-line-length
export type InputType = "color" | "date" | "datetime" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "range" | "search" | "tel" | "text" | "time" | "url" | "week";

/**
 * @whatItDoes Represents constructor parameter for {@link DorfInputDefinition}.
 *
 * @description
 * Input has a mandatory [type]{@link InputType} property. It has to support HTML5 types.
 *
 * @stable
 */
export interface IDorfInputDefinition<T> extends IDorfFieldDefinition<T> {
    type: InputType;
}

/**
 * @whatItDoes Represents a [definition]{@link DorfFieldDefinition} for the input field.
 *
 * @stable
 */
export class DorfInputDefinition<T> extends DorfFieldDefinition<T> implements IDorfInputDefinition<T> {

    private _type: InputType = 'text';

    constructor(options?: IDorfInputDefinition<T>) {
        super(options);

        if (options) {
            this._type = options.type || this._type;
        }
    }

    get type() { return this._type; }

    get tag() { return DorfTag.INPUT; }
}

/**
 * @whatItDoes Represents a [metadata]{@link DorfFieldMetadata} for the input field.
 *
 * @stable
 */
export class DorfInputMetadata<T> extends DorfFieldMetadata<T, DorfInputDefinition<T>> implements IDorfInputDefinition<T> {

    constructor(definition = new DorfInputDefinition<T>(), options?: IDorfFieldMetadata<T>) {
        super(definition, options);
    }

    get type() { return this.definition.type; }
}

/**
 * @whatItDoes DORF input field which consumes {@link DorfInputMetadata} for rendering.
 *
 * @description
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: DorfTag.INPUT,
    templateUrl: './dorf-input.component.html'
})
export class DorfInputComponent<T> extends AbstractDorfFieldComponent<T, DorfInputMetadata<T>> implements IDorfInputDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get type() { return this.metadata.type; }
}