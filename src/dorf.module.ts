import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DorfConfigService, DorfSupportingService } from "./dorf-config.service";
import { DorfMapper } from "./dorf-mapper";

import { DorfInputComponent } from "./fields/dorf-input.component";
import { DorfRadioComponent } from "./fields/dorf-radio.component";
import { DorfSelectComponent } from "./fields/dorf-select.component";
import { DorfCheckboxComponent } from "./fields/dorf-checkbox.component";

/**
 * Typescript files which should be exported.
 */
export * from "./decorators/dorf-form.decorator";
export * from "./decorators/dorf-object.decorator";

export * from "./dorf-mapper";
export * from "./base/abstract-dorf.model";
export * from "./fields/base/abstract-dorf-field.component";
export * from "./fields/base/abstract-dorf-choose.component";
export * from "./base/abstract-dorf-form.component";

export * from "./dorf-config.service";

export * from "./fields/dorf-checkbox.component";
export * from "./fields/dorf-input.component";
export * from "./fields/dorf-radio.component";
export * from "./fields/dorf-select.component";

/**
 * Library module. To provide custom CSS classes it should be imported with forRoot method.
 */
@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [DorfConfigService],
    declarations: [DorfInputComponent, DorfRadioComponent, DorfSelectComponent, DorfCheckboxComponent],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        DorfInputComponent,
        DorfRadioComponent,
        DorfSelectComponent,
        DorfCheckboxComponent
    ]
})
export class DorfModule {
    // TODO: add another module which would use HTML templates provided by user
    static forRoot(config: DorfSupportingService): ModuleWithProviders {
        return {
            ngModule: DorfModule,
            providers: [
                { provide: DorfSupportingService, useValue: config }
            ]
        };
    }
}