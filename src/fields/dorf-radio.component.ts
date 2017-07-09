import { Component } from '@angular/core';

import { IDorfCommonCssClasses } from '../base/dorf-css-classes';
import { IDorfRadioDefinition } from './dorf-radio.definition';
import { DorfRadioMetadata } from './dorf-radio.metadata';
import { DorfChooseComponent } from './base/abstract-dorf-choose.component';
import { RADIO } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

/**
 * DORF radio field which consumes {@link DorfRadioMetadata} for rendering.
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    selector: RADIO,
    template: `
    <label *ngFor="let opt of optionsToSelect; let idx = index" [ngClass]="innerLabelCss">
        <input type="radio" [value]="opt.key" id="{{key}}-{{idx}}" [name]="key" [formControl]="formControl" [ngClass]="htmlFieldCss"> {{opt.value}}
    </label>
    `
})
export class DorfRadioComponent<T> extends DorfChooseComponent<T, DorfRadioMetadata<T>> {
    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    get innerLabelCss() { return this.getCss('innerLabel'); }
}
