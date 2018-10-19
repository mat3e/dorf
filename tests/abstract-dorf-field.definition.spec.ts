import { Validators } from '@angular/forms';

import { DorfFieldDefinition } from '../src/fields/base/abstract-dorf-field.definition';
import { DorfInputDefinition } from '../src/fields/dorf-input.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';

describe('DorfDefinitionBase', () => {
    // nothing for now
});

describe('DorfFieldDefinition', () => {
    it('should have default value for "validator" and null for "asyncValidator"', () => {
        // GIVEN + WHEN
        let def1: DorfFieldDefinition<any> = new DorfInputDefinition();
        let def2: DorfFieldDefinition<any> = new DorfSelectDefinition();

        // THEN
        expect(def1.validator).toEqual(Validators.nullValidator);
        expect(def2.validator).toEqual(Validators.nullValidator);
        expect(def1.asyncValidator).toBeUndefined();
        expect(def2.asyncValidator).toBeUndefined();
    });
});
