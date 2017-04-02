import { Validators } from '@angular/forms';

import { DorfFieldCssClasses } from '../src/base/dorf-css-classes';

import { DorfFieldDefinition } from '../src/fields/base/abstract-dorf-field.definition';
import { DorfInputDefinition } from '../src/fields/dorf-input.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';

describe('DorfFieldDefinition', () => {
    it('should have default values for validators, "isListField" and "css"', () => {
        // GIVEN + WHEN
        let def1: DorfFieldDefinition<any> = new DorfInputDefinition();
        let def2: DorfFieldDefinition<any> = new DorfSelectDefinition();

        // THEN
        expect(def1.validator).toEqual(Validators.nullValidator);
        expect(def2.validator).toEqual(Validators.nullValidator);
        expect(def1.asyncValidator).toBeNull();
        expect(def2.asyncValidator).toBeNull();
        expect(def1.onSummary).toBeFalsy();
        expect(def2.onSummary).toBeFalsy();
        expect(def1.css).toEqual(new DorfFieldCssClasses());
        expect(def2.css).toEqual(new DorfFieldCssClasses());
    });
});