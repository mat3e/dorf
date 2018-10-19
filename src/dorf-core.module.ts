import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DorfConfigService, DorfSupportingService, IDorfService } from './dorf-config.service';

/*
Typescript files which should be exported.
 */
export * from './decorators/dorf-form.decorator';
export * from './decorators/dorf-object.decorator';

export * from './base/abstract-dorf.model';
export * from './base/dorf-css-classes';

export * from './fields/base/dorf-field';
export * from './fields/base/abstract-dorf-field.definition';
export * from './fields/base/abstract-dorf-field.metadata';
export * from './fields/base/abstract-dorf-field.component';
export * from './fields/base/abstract-dorf-choose.definition';
export * from './fields/base/abstract-dorf-choose.metadata';
export * from './fields/base/abstract-dorf-choose.component';
export * from './fields/base/dorf-nested.definition';
export * from './fields/base/dorf-nested.metadata';

export * from './base/dorf-mapper';
export * from './dorf-config.service';

/**
 * Token which allows injecting an interface to the factory.
 */
export const CONFIG_INTERFACE = new InjectionToken<string>('config-interface');

/**
 * Factory method for creating DORF config.
 *
 * @param config interface injected thanks to InjectionToken
 */
export function configFactory(config: IDorfService): DorfSupportingService {
    return new DorfSupportingService(config);
}

/**
 * Base library module.
 *
 * This module exports `FormsModule` and `ReactiveFormsModule`.
 *
 * This version of DORF module, requires additional components, like `dorf-input`, `dorf-select`, `dorf-radio`, `dorf-checkbox`.
 * Those can be defined on their own or add through the following DORF declarations:
 * `[DorfInputComponent, DorfRadioComponent, DorfSelectComponent, DorfCheckboxComponent, DorfButtonsComponent, DorfFieldComponent, DorfFieldWrapperComponent, DorfGroupWrapperComponent]`.
 *
 * It may be imported by `forRoot` method and then there is a possibility to define custom fields and CSS classes.
 *
 * @example
 * ```
 *
 *  //
 *  DorfCoreModule.forRoot({
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
                { provide: CONFIG_INTERFACE, useValue: config },
                { provide: DorfSupportingService, useFactory: configFactory, deps: [CONFIG_INTERFACE] }
            ]
        };
    }
}
