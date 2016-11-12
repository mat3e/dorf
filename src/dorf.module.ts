import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DorfInputComponent } from "./dorf-input.component";
import { DorfSelectComponent } from "./dorf-select.component";

import { DorfService, DorfConfigService } from "./dorf.service";

/**
 * Library module. To provide custom CSS classes it should be imported with forRoot method.
 */
@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [DorfService],
    declarations: [DorfInputComponent, DorfSelectComponent],
    exports: [DorfInputComponent, DorfSelectComponent]
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