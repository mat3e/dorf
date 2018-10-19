import { CHECKBOX } from '../src/fields/base/constants';
import { DorfCheckboxDefinition } from '../src/fields/dorf-checkbox.definition';

describe('DorfCheckboxDefinition', () => {
    it('should have default value for "tag" property', () => {
        // GIVEN + WHEN
        let def = new DorfCheckboxDefinition();

        // THEN
        expect(def.tag).toEqual(CHECKBOX);
        expect(def.mapping).toBeUndefined();
        expect(def.innerLabel).toBeUndefined();
    });
});
