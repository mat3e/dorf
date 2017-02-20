import { Input, Component } from '@angular/core';

import { DorfFieldDefinition } from './dorf-field.definition';
import { DorfFieldMetadata } from './dorf-field.metadata';
import { DorfField } from './dorf-field';

/**
 * @whatItDoes Component which switch between all DORF fields.
 *
 * @howToUse
 * It is used within all the default form templates.
 *
 * ##Example
 * ```
 * <dorf-field></dorf-field>
 * ```
 *
 * @description
 * There are 4 base fields + additional ones, defined by the library user. This component group all those fields in order to speed up HTML
 * creation. It is possible to include own HTML code between tags.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: 'dorf-field',
    templateUrl: './dorf-field-wrapper.component.html'
})
export class DorfFieldWrapperComponent<T, M extends DorfFieldMetadata<T, DorfFieldDefinition<T>>> {
    @Input()
    metadata: M;

    get isDorfInput() {
        return this.isDorfTag(DorfField.INPUT);
    }

    get isDorfRadio() {
        return this.isDorfTag(DorfField.RADIO);
    }

    get isDorfSelect() {
        return this.isDorfTag(DorfField.SELECT);
    }

    get isDorfCheckbox() {
        return this.isDorfTag(DorfField.CHECKBOX);
    }

    protected isDorfTag(tag: string) {
        return this.metadata.tag === tag;
    }
}
