import { ValueProvider } from "@angular/core";

import { DorfModule } from "../src/dorf.module";
import { DorfSupportingService } from "../src/dorf-config.service";

describe("DorfModule", () => {
    it("supports parametrized DorfConfigService in forRoot method", () => {
        // GIVEN
        let opts = new DorfSupportingService({
            fieldClass: "test"
        });

        // WHEN
        let module = DorfModule.forRoot(opts);

        // THEN
        let provider = module.providers[0] as ValueProvider;
        expect(provider.useValue).toEqual(opts);
    });
});