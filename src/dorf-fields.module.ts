import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { DorfCoreModule } from './dorf-core.module';

import { IDorfService, DorfSupportingService } from './dorf-config.service';

import { DorfInputComponent } from './fields/dorf-input.component';
import { DorfRadioComponent } from './fields/dorf-radio.component';
import { DorfSelectComponent } from './fields/dorf-select.component';
import { DorfCheckboxComponent } from './fields/dorf-checkbox.component';
import { DorfFieldComponent } from './fields/base/dorf-field.component';

export * from './fields/dorf-checkbox.definition';
export * from './fields/dorf-checkbox.metadata';
export * from './fields/dorf-checkbox.component';

export * from './fields/dorf-input.definition';
export * from './fields/dorf-input.metadata';
export * from './fields/dorf-input.component';

export * from './fields/dorf-radio.definition';
export * from './fields/dorf-radio.metadata';
export * from './fields/dorf-radio.component';

export * from './fields/dorf-select.definition';
export * from './fields/dorf-select.metadata';
export * from './fields/dorf-select.component';

export * from './fields/base/dorf-field.component';

/**
 * Library module with all the fields-related components.
 *
 * This is DORF essence. Should be replaced when totally different HTML structure for fields needed (e.g. Angular Material with DORF).
 * This module exports `FormsModule` and `ReactiveFormsModule` and all the predefined DORF field components. This version of DORF module,
 * requires additional components, like `dorf-field-wrapper` and `dorf-buttons`.
 * Those can be defined and included on their own or through the following DORF declarations:
 * `[DorfButtonsComponent, DorfFieldWrapperComponent]`.
 *
 * It may be imported by `forRoot` method and then there is a possibility to define custom fields and CSS classes.
 *
 * @example
 * ```
 *
 *  //
 *  DorfModule.forRoot({
 *    css: {
 *      general: {
 *        form: "pure-form pure-form-aligned",
 *        group: "pure-control-group",
 *        error: "error-message"
 *      }
 *    },
 *    dorfFields: [{
 *      tag: StarRatingDefinition.TAG,
 *      definition: StarRatingDefinition,
 *      metadata: StarRatingMetadata
 *    }]
 *  })],
 * ```
 *
 * @stable
 */
@NgModule({
    imports: [CommonModule, DorfCoreModule],
    declarations: [
        DorfInputComponent,
        DorfRadioComponent,
        DorfSelectComponent,
        DorfCheckboxComponent,
        DorfFieldComponent
    ],
    exports: [
        DorfCoreModule,
        DorfInputComponent,
        DorfRadioComponent,
        DorfSelectComponent,
        DorfCheckboxComponent,
        DorfFieldComponent
    ]
})
export class DorfFieldsModule {
    static forRoot(config: IDorfService): ModuleWithProviders {
        return {
            ngModule: DorfFieldsModule,
            providers: [
                { provide: DorfSupportingService, useValue: new DorfSupportingService(config) }
            ]
        };
    }
}
