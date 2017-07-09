import { Component } from '@angular/core';

import { IDorfFieldMetadata } from './base/abstract-dorf-field.metadata';
import { IDorfSelectDefinition } from './dorf-select.definition';
import { DorfSelectMetadata } from './dorf-select.metadata';
import { DorfChooseComponent } from './base/abstract-dorf-choose.component';
import { SELECT } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

/**
 * DORF select field which consumes {@link DorfSelectMetadata} for rendering.
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    selector: SELECT,
    template: `
    <select *ngIf="!multiple" [id]="key" [name]="key" [formControl]="formControl" [ngClass]="htmlFieldCss">
        <option *ngFor="let opt of optionsToSelect" [value]="opt.key">{{opt.value}}</option>
    </select>
    <select *ngIf="multiple" [id]="key" [name]="key" [formControl]="formControl" [ngClass]="htmlFieldCss" multiple>
        <option *ngFor="let opt of optionsToSelect" [value]="opt.key">{{opt.value}}</option>
    </select>
    `
})
export class DorfSelectComponent<T> extends DorfChooseComponent<T, DorfSelectMetadata<T>> {

    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    /** @inheritdoc */
    get multiple() { return this.metadata.multiple; }
}
