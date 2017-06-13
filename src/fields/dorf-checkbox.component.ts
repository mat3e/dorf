import { Component, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IDorfCommonCssClasses } from '../base/dorf-css-classes';
import { ICheckboxMapping, IDorfCheckboxDefinition } from './dorf-checkbox.definition';
import { DorfCheckboxMetadata } from './dorf-checkbox.metadata';
import { AbstractDorfFieldComponent } from './base/abstract-dorf-field.component';
import { DorfField } from './base/dorf-field';

import { DorfConfigService } from '../dorf-config.service';

/**
 * DORF checkbox field which consumes {@link DorfCheckboxMetadata} for rendering.
 * One of the predefined DORF fields.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: DorfField.CHECKBOX,
    templateUrl: './dorf-checkbox.component.html'
})
// tslint:disable-next-line:max-line-length
export class DorfCheckboxComponent<T> extends AbstractDorfFieldComponent<T, DorfCheckboxMetadata<T>> implements IDorfCheckboxDefinition<T>, OnChanges {

    /**
     * True/false value which is seen by the end user.
     */
    checkboxValue: boolean;

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
    get innerLabelCss() { return this.getCss('innerLabel'); }
}