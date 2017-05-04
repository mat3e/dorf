import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { DorfFieldsModule } from './dorf-fields.module';

import { DorfButtonsComponent } from './base/dorf-buttons.component';
import { IDorfService, DorfSupportingService } from './dorf-config.service';
import { DorfFieldWrapperComponent } from './fields/base/dorf-field-wrapper.component';
import { DorfGroupWrapperComponent } from './fields/base/dorf-group-wrapper.component';

export * from './fields/base/dorf-group-wrapper.component';
export * from './fields/base/dorf-field-wrapper.component';
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
 *   additionalFields: [{
 *     tag: StarRatingDefinition.TAG,
 *     definition: StarRatingDefinition,
 *     metadata: StarRatingMetadata
 *   }]
 * })],
 * ```
 *
 * @description
 * This module exports `FormsModule` and `ReactiveFormsModule` and all the predefined DORF components.
 *
 * @stable
 */
@NgModule({
    imports: [CommonModule, DorfFieldsModule],
    declarations: [
        DorfButtonsComponent,
        DorfFieldWrapperComponent,
        DorfGroupWrapperComponent
    ],
    exports: [
        DorfFieldsModule,
        DorfButtonsComponent,
        DorfFieldWrapperComponent,
        DorfGroupWrapperComponent
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