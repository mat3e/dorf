import { Component } from '@angular/core';

import { IDorfRadioDefinition } from './dorf-radio.definition';
import { DorfRadioMetadata } from './dorf-radio.metadata';
import { DorfChooseComponent } from './base/abstract-dorf-choose.component';
import { DorfField } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

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
    selector: DorfField.RADIO,
    templateUrl: './dorf-radio.component.html'
})
export class DorfRadioComponent<T> extends DorfChooseComponent<T, DorfRadioMetadata<T>> implements IDorfRadioDefinition<T> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get innerLabelCss() { return this.directCss.innerLabel || this.cssFromFieldConfig.innerLabel || this.cssFromConfig.innerLabel; }
}