import { Component, OnChanges } from '@angular/core';
import { DorfCheckboxMetadata } from './dorf-checkbox.metadata';
import { AbstractDorfFieldComponent } from './base/abstract-dorf-field.component';
import { CHECKBOX } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

/**
 * DORF checkbox field which consumes {@link DorfCheckboxMetadata} for rendering.
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    selector: CHECKBOX,
    template: `
    <label [attr.for]="key" [ngClass]="innerLabelCss">
        <input #view [id]="key" [ngClass]="htmlFieldCss" (change)="setValue(view.checked)" [checked]="checkboxValue" type="checkbox" [disabled]="config.isDisabled" /> {{innerLabel}}
    </label>
    <input [name]="key" [formControl]="formControl" type="hidden" />
    `,
    styles: [`.dorf-required:after {content: '*'; color: red;}`]
})
// tslint:disable-next-line:max-line-length
export class DorfCheckboxComponent<T> extends AbstractDorfFieldComponent<T, DorfCheckboxMetadata<T>> implements OnChanges {

    /**
     * True/false value which is seen by the end user.
     */
    checkboxValue: boolean;

    private _innerLabelCss: string;

    /** @inheritdoc */
    constructor(config: DorfConfigService) {
        super(config);
    }

    /** @inheritdoc */
    ngOnChanges() {
        if (this.metadata.mapping) {
            this.checkboxValue = this.formControl.value === this.metadata.mapping.trueValue;
        } else {
            this.checkboxValue = this.formControl.value;
        }
    }

    /**
     * Callback which sets the mapping value based on the state of the visible checkbox.
     */
    setValue(value: boolean) {
        if (this.metadata.mapping) {
            this.formControl.setValue(value ? this.metadata.mapping.trueValue : this.metadata.mapping.falseValue);
        } else {
            this.formControl.setValue(value);
        }
    }

    /**
     * Checkbox has a label around it, which is independent from the label from wrapper.
     */
    get innerLabel() { return this.metadata.innerLabel; }
    get innerLabelCss() {
        if (!this._innerLabelCss) {
            this._innerLabelCss = '';
            if (this.config.requiredWithStar && this.metadata.isRequired) {
                this._innerLabelCss = 'dorf-required';
            }
            let labelClasses = this.getCss('innerLabel');
            if (labelClasses) {
                this._innerLabelCss = `${labelClasses} ${this._innerLabelCss}`;
            }
        }
        return this._innerLabelCss;
    }
}
