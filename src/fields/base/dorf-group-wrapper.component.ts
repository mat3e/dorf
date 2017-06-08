import { Input, Component, OnChanges } from '@angular/core';

import { DorfConfigService } from '../../dorf-config.service';

import { IDorfCommonCssClasses } from '../../base/dorf-css-classes';

import { groupMetadata } from './util';
import { IDorfFieldMetadata } from './abstract-dorf-field.metadata';
import { DorfNestedMetadata } from './dorf-nested.metadata';

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
// TODO: reconsider using DorfForm annotation here
@Component({
    moduleId: `${module.id}`,
    selector: 'dorf-group-wrapper',
    templateUrl: './dorf-group-wrapper.component.html'
})
export class DorfGroupWrapperComponent<T> implements OnChanges {
    @Input('group')
    meta: DorfNestedMetadata<any>;

    groupedFieldsMetadata: (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[];

    constructor(public config: DorfConfigService) { }

    ngOnChanges(): void {
        this.groupedFieldsMetadata = groupMetadata(this.meta.nestedFieldsMetadata, this.meta.columnsNumber || this.config.columnsNumber)
    }

    get fieldsetCss() { return this.getCss('fieldset'); }
    get legendCss() { return this.getCss('legend'); }
    get sectionCss() { return this.getCss('section'); }

    protected getCss(cssClass: string) {
        let result = this.meta.getCss(cssClass);
        if (this.meta.isNested) {
            result = result || this.config.getCssClassForNestedTag(this.meta.tag, cssClass);
        } else {
            result = result || this.config.getCssClassForTag(this.meta.tag, cssClass);
        }
        return result;
    }
}
