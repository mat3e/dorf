import { Component } from '@angular/core';

import { InputType } from './dorf-input.definition';
import { DorfInputMetadata } from './dorf-input.metadata';
import { AbstractDorfFieldComponent } from './base/abstract-dorf-field.component';
import { INPUT } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

/**
 * DORF input field which consumes {@link DorfInputMetadata} for rendering.
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    selector: INPUT,
    template: `
    <input *ngIf="isRange" [id]="key" [name]="key" [formControl]="formControl" [ngClass]="htmlFieldCss" type="range" />
    <input *ngIf="isNumber" [id]="key" [name]="key" [formControl]="formControl" [ngClass]="htmlFieldCss" type="number" />
    <input *ngIf="isOtherType" [id]="key" [name]="key" [type]="type" [formControl]="formControl" [ngClass]="htmlFieldCss" />
    `
})
export class DorfInputComponent<T> extends AbstractDorfFieldComponent<T, DorfInputMetadata<T>> {

    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    /** @inheritdoc */
    get type() { return this.metadata.type; }
    get isRange() { return this.type === 'range' as InputType; }
    get isNumber() { return this.type === 'number' as InputType; }
    get isOtherType() { return !this.isRange && !this.isNumber; }
}
