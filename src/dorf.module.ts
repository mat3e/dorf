import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DorfInputComponent } from "./dorf-input.component";
import { DorfRadioComponent } from "./dorf-radio.component";
import { DorfSelectComponent } from "./dorf-select.component";

import { DorfService, DorfConfigService } from "./dorf.service";

/**
 * Typescript files which should be exported.
 */
export * from "./dorf-mapper";
export * from "./dorf.service";
export * from "./abstract-dorf.model";
export * from "./abstract-dorf-field.component";
export * from "./abstract-dorf-details.component";

export { IDorfInputDefinition, DorfInputDefinition, DorfInputMetadata } from "./dorf-input.component";
export { IDorfRadioDefinition, DorfRadioDefinition, DorfRadioMetadata } from "./dorf-radio.component";
export { IDorfSelectDefinition, DorfSelectDefinition, DorfSelectMetadata } from "./dorf-select.component";

/**
 * Library module. To provide custom CSS classes it should be imported with forRoot method.
 */
@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [DorfService],
    declarations: [DorfInputComponent, DorfRadioComponent, DorfSelectComponent],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        DorfInputComponent,
        DorfRadioComponent,
        DorfSelectComponent
    ]
})
export class DorfModule {
    // TODO: add another module which would use HTML templates provided by user
    static forRoot(config: DorfConfigService): ModuleWithProviders {
        return {
            ngModule: DorfModule,
            providers: [
                { provide: DorfConfigService, useValue: config }
            ]
        };
    }
}