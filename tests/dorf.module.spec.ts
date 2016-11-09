import { ValueProvider } from "@angular/core";

import { DorfModule } from "../dorf.module";
import { DorfConfigService } from "../dorf.service";

describe("DorfModule", () => {
    it("supports parametrized DorfConfigService in forRoot method", () => {
        // GIVEN
        let config = new DorfConfigService({
            fieldClass: "test"
        });

        // WHEN
        let module = DorfModule.forRoot(config);

        // THEN
        let provider = module.providers[0] as ValueProvider;
        expect(provider.useValue).toEqual(config);
    });
});