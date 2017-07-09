import { Component } from '@angular/core';

import { DorfConfigService } from '../../dorf-config.service';
import { IDorfCommonCssClasses, DorfCssClasses } from '../../base/dorf-css-classes';
import { IDorfFieldDefinition } from './abstract-dorf-field.definition';
import { DorfFieldMetadata } from './abstract-dorf-field.metadata';
import { AbstractDorfFieldComponent } from './abstract-dorf-field.component';
import { DorfField } from './dorf-field';

/**
 * Group which wraps label, dorf-field and error.
 * This component is used in default templates. It contains a common part for all the fields and the fields themselves,
 * by using [DorfFieldComponent abstraction]{@link DorfFieldComponent}.
 *
 * @stable
 */
@Component({
    selector: 'dorf-field-wrapper',
    template: `
    <label *ngIf="label" [attr.for]="key" [ngClass]="labelCss">{{label}}</label>
    <dorf-field [metadata]="metadata" [ngClass]="fieldGeneralizationCss">
        <ng-content></ng-content>
    </dorf-field>
    <div *ngIf="invalid && errorMessage" [ngClass]="errorCss">{{errorMessage}}</div>
    `,
    styles: [':host {display: flex;}', `.dorf-required:after {content: '*'; color: red;}`]
})
export class DorfFieldWrapperComponent<T, M extends DorfFieldMetadata<T, IDorfFieldDefinition<T>>>
    extends AbstractDorfFieldComponent<T, M> {

    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    /** @inheritdoc */
    get errorMessage() { return this.metadata.errorMessage; }
    get errorCss() { return this.getCss('error'); }
    get fieldGeneralizationCss() { return this.getCss('fieldGeneralization'); }
}
