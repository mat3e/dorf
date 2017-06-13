import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DorfConfigService } from '../dorf-config.service';

/**
 * DORF buttons to be used in all the forms.
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

    /**
     * Form controlled by the buttons.
     */
    @Input() form: FormGroup;

    @Output() onDorfSubmit: EventEmitter<void> = new EventEmitter<void>();
    @Output() onDorfReset: EventEmitter<void> = new EventEmitter<void>();

    /**
     * @param {DorfConfigService} config injected [DORF config]{@link DorfConfigService}.
     */
    constructor(public config: DorfConfigService) { }

    /**
     * Emitting submit event action.
     */
    submit() {
        this.onDorfSubmit.emit();
    }

    /**
     * Emitting reset event action.
     */
    reset() {
        this.onDorfReset.emit();
    }
}