import { Component } from '@angular/core';

import { IDorfInputDefinition } from './dorf-input.definition';
import { DorfInputMetadata } from './dorf-input.metadata';
import { AbstractDorfFieldComponent } from './base/abstract-dorf-field.component';
import { DorfField } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

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
    selector: DorfField.INPUT,
    templateUrl: './dorf-input.component.html'
})
export class DorfInputComponent<T> extends AbstractDorfFieldComponent<T, DorfInputMetadata<T>> implements IDorfInputDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get type() { return this.metadata.type; }
}