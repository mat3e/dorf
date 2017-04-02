import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDorfService, DorfConfigService, DorfSupportingService } from './dorf-config.service';
import { DorfMapper } from './base/dorf-mapper';

/*
Typescript files which should be exported.
 */
export * from './decorators/dorf-form.decorator';
export * from './decorators/dorf-object.decorator';

export * from './base/abstract-dorf.model';
export * from './base/dorf-css-classes';
export * from './base/abstract-dorf-form.component';

export * from './fields/base/dorf-field';
export * from './fields/base/abstract-dorf-field.definition';
export * from './fields/base/abstract-dorf-field.metadata';
export * from './fields/base/abstract-dorf-field.component';
export * from './fields/base/abstract-dorf-choose.definition';
export * from './fields/base/abstract-dorf-choose.metadata';
export * from './fields/base/abstract-dorf-choose.component';

export * from './base/dorf-mapper';
export * from './dorf-config.service';

/**
 * @whatItDoes Base library module. It requires DORF components.
 *
 * @howToUse
 * It may be imported by `forRoot` method and then there is a possibility to define custom fields and CSS classes.
 *
 * ### Example
 * ```
 * DorfCoreModule.forRoot({
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
 * This module exports `FormsModule` and `ReactiveFormsModule`. This version of DORF module, requires additional components,
 * like `dorf-input`, `dorf-select`, `dorf-radio`, `dorf-checkbox`. You can define them on your own or add following DORF declarations:
 * `[DorfInputComponent, DorfRadioComponent, DorfSelectComponent, DorfCheckboxComponent, DorfButtonsComponent, DorfFieldComponent, DorfFieldWrapperComponent]`
 * to your module.
 *
 * @stable
 */
@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [DorfConfigService],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ]
})
export class DorfCoreModule {
    static forRoot(config: IDorfService): ModuleWithProviders {
        return {
            ngModule: DorfCoreModule,
            providers: [
                { provide: DorfSupportingService, useValue: new DorfSupportingService(config) }
            ]
        };
    }
}