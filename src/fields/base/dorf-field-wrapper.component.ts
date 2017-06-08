import { Component } from '@angular/core';

import { DorfConfigService } from '../../dorf-config.service';
import { IDorfCommonCssClasses, DorfCssClasses } from '../../base/dorf-css-classes';
import { IDorfFieldDefinition } from './abstract-dorf-field.definition';
import { DorfFieldMetadata } from './abstract-dorf-field.metadata';
import { AbstractDorfFieldComponent } from './abstract-dorf-field.component';
import { DorfField } from './dorf-field';

/**
 * @whatItDoes Group which wraps label, dorf-field and error.
 *
 * @howToUse
 * In order to use different field components (e.g. from Angular's material) this component should be one of the changed ones.
 *
 * @description
 * This component is used in default templates. It abstracts DORF group. It contains a common part for all the fields and the fields
 * themselves, by using [DorfFieldComponent abstraction]{@link DorfFieldComponent}.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: 'dorf-field-wrapper',
    templateUrl: './dorf-field-wrapper.component.html',
    styles: [':host {display: block}']
})
export class DorfFieldWrapperComponent<T, M extends DorfFieldMetadata<T, IDorfFieldDefinition<T>>>
    extends AbstractDorfFieldComponent<T, M> {

    constructor(config: DorfConfigService) {
        super(config);
    }

    get errorMessage() { return this.metadata.errorMessage; }
    get errorCss() { return this.getCss('error'); }
    get fieldGeneralizationCss() { return this.getCss('fieldGeneralization'); }
}
