import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DorfConfigService } from '../dorf-config.service';

/**
 * @whatItDoes DORF buttons for handling all the forms.
 *
 * @description
 * Forms have to support user actions. It is handled by buttons and events from this component.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: 'dorf-buttons',
    templateUrl: './dorf-buttons.component.html'
})
export class DorfButtonsComponent {

    @Input() form: FormGroup;
    @Output() onDorfSubmit: EventEmitter<void> = new EventEmitter<void>();
    @Output() onDorfReset: EventEmitter<void> = new EventEmitter<void>();

    constructor(public config: DorfConfigService) { }

    submit() {
        this.onDorfSubmit.emit();
    }

    reset() {
        this.onDorfReset.emit();
    }
}