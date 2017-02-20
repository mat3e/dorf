import { Component } from '@angular/core';

import { IDorfFieldMetadata } from './base/dorf-field.metadata';
import { IDorfSelectDefinition } from './dorf-select.definition';
import { DorfSelectMetadata } from './dorf-select.metadata';
import { DorfChooseComponent } from './base/abstract-dorf-choose.component';
import { DorfField } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

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
    selector: DorfField.SELECT,
    templateUrl: './dorf-select.component.html'
})
export class DorfSelectComponent<T> extends DorfChooseComponent<T, DorfSelectMetadata<T>> implements IDorfSelectDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get multiple() { return this.metadata.multiple; }
}