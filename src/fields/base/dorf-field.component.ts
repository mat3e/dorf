import { Component } from '@angular/core';

import { DorfConfigService } from '../../dorf-config.service';
import { IDorfCommonCssClasses } from '../../base/dorf-css-classes';
import { IDorfFieldDefinition } from './abstract-dorf-field.definition';
import { DorfFieldMetadata } from './abstract-dorf-field.metadata';
import { AbstractDorfFieldComponent } from './abstract-dorf-field.component';
import { INPUT, RADIO, SELECT, CHECKBOX, DorfField } from './dorf-field';

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
    selector: 'dorf-field',
    template: `
    <dorf-input *ngIf="isDorfInput" [metadata]="metadata" [ngClass]="dorfFieldCss"></dorf-input>
    <dorf-radio *ngIf="isDorfRadio" [metadata]="metadata" [ngClass]="dorfFieldCss"></dorf-radio>
    <dorf-select *ngIf="isDorfSelect" [metadata]="metadata" [ngClass]="dorfFieldCss"></dorf-select>
    <dorf-checkbox *ngIf="isDorfCheckbox" [metadata]="metadata" [ngClass]="dorfFieldCss"></dorf-checkbox>

    <!-- Fields defined by the user. -->
    <ng-content></ng-content>
    `
})
export class DorfFieldComponent<T, M extends DorfFieldMetadata<T, IDorfFieldDefinition<T>>> extends AbstractDorfFieldComponent<T, M> {

    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    get dorfFieldCss() { return this.getCss('dorfField'); }

    get isDorfInput() { return this.isDorfTag(INPUT); }
    get isDorfRadio() { return this.isDorfTag(RADIO); }
    get isDorfSelect() { return this.isDorfTag(SELECT); }
    get isDorfCheckbox() { return this.isDorfTag(CHECKBOX); }
    protected isDorfTag(tag: string) { return this.metadata.tag === tag; }
}
