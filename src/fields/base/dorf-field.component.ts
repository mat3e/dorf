import { Component } from '@angular/core';

import { DorfConfigService } from '../../dorf-config.service';
import { IDorfCommonCssClasses } from '../../base/dorf-css-classes';
import { IDorfFieldDefinition } from './abstract-dorf-field.definition';
import { DorfFieldMetadata } from './abstract-dorf-field.metadata';
import { AbstractDorfFieldComponent } from './abstract-dorf-field.component';
import { DorfField } from './dorf-field';

/**
 * Component which switch between all built-in DORF fields.
 * There are 4 base fields + additional ones, passed with {@link DorfConfigService}. This component groups all those fields
 * in order to speed up HTML template creation. Only one field will be visible at a time.
 * It is possible to include custom HTML code between component's tags.
 *
 * @example
 * ```
 *
 *
 *  <dorf-field [metadata]="fieldMeta">
 *    <star-rating *ngIf="fieldMeta.tag === 'star-rating'" [metadata]="fieldMeta"></star-rating>
 *  </dorf-field>
 * ```
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: 'dorf-field',
    templateUrl: './dorf-field.component.html'
})
export class DorfFieldComponent<T, M extends DorfFieldMetadata<T, IDorfFieldDefinition<T>>> extends AbstractDorfFieldComponent<T, M> {

    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    get dorfFieldCss() { return this.getCss('dorfField'); }

    get isDorfInput() { return this.isDorfTag(DorfField.INPUT); }
    get isDorfRadio() { return this.isDorfTag(DorfField.RADIO); }
    get isDorfSelect() { return this.isDorfTag(DorfField.SELECT); }
    get isDorfCheckbox() { return this.isDorfTag(DorfField.CHECKBOX); }
    protected isDorfTag(tag: string) { return this.metadata.tag === tag; }
}
