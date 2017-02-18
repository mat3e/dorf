import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { DorfCoreModule } from './dorf-core.module';

import { DorfButtonsComponent } from './base/dorf-buttons.component';
import { IDorfService, DorfSupportingService } from './dorf-config.service';

import { DorfInputComponent } from './fields/dorf-input.component';
import { DorfRadioComponent } from './fields/dorf-radio.component';
import { DorfSelectComponent } from './fields/dorf-select.component';
import { DorfCheckboxComponent } from './fields/dorf-checkbox.component';
import { DorfFieldWrapperComponent } from './fields/base/abstract-dorf-field.component';

export * from './fields/dorf-checkbox.component';
export * from './fields/dorf-input.component';
export * from './fields/dorf-radio.component';
export * from './fields/dorf-select.component';
export * from './base/dorf-buttons.component';

/**
 * @whatItDoes Library module with all the default components.
 *
 * @howToUse
 * It may be imported by `forRoot` method and then there is a possibility to define custom fields and CSS classes.
 *
 * ### Example
 * ```
 * DorfModule.forRoot({
 *   css: {
 *     general: {
 *       form: "pure-form pure-form-aligned",
 *       group: "pure-control-group",
 *       error: "error-message"
 *     }
 *   },
 *   additionalMetadataKinds: [{
 *     tag: StarRatingDefinition.TAG,
 *     definition: StarRatingDefinition,
 *     metadata: StarRatingMetadata
 *   }]
 * })],
 * ```
 *
 * @description
 * This module exports `FormsModule` and `ReactiveFormsModule` and all the predefined DORF field components.
 *
 * @stable
 */
@NgModule({
    imports: [CommonModule, DorfCoreModule],
    declarations: [
        DorfButtonsComponent,
        DorfInputComponent,
        DorfRadioComponent,
        DorfSelectComponent,
        DorfCheckboxComponent,
        DorfFieldWrapperComponent
    ],
    exports: [
        DorfCoreModule,
        DorfInputComponent,
        DorfRadioComponent,
        DorfSelectComponent,
        DorfCheckboxComponent,
        DorfButtonsComponent,
        DorfFieldWrapperComponent
    ]
})
export class DorfModule {
    static forRoot(config: IDorfService): ModuleWithProviders {
        return {
            ngModule: DorfModule,
            providers: [
                { provide: DorfSupportingService, useValue: new DorfSupportingService(config) }
            ]
        };
    }
}