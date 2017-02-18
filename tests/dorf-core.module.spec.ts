import { ValueProvider } from '@angular/core';

import { DorfCoreModule } from '../src/dorf-core.module';
import { DorfSupportingService } from '../src/dorf-config.service';

describe('DorfCoreModule', () => {
    it('supports parametrized DorfConfigService in forRoot method', () => {
        // GIVEN
        let opts = {
            css: { general: { form: 'test' } }
        };

        // WHEN
        let module = DorfCoreModule.forRoot(opts);

        // THEN
        let provider = module.providers[0] as ValueProvider;
        expect(provider.useValue).toEqual(new DorfSupportingService(opts));
    });
});
