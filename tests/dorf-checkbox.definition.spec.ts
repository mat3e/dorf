import { DorfField } from '../src/fields/base/dorf-field';
import { DorfCheckboxDefinition } from '../src/fields/dorf-checkbox.definition';

describe('DorfCheckboxDefinition', () => {
    it('should have default value for tag property and no mapping set', () => {
        // GIVEN + WHEN
        let def = new DorfCheckboxDefinition();

        // THEN
        expect(def.tag).toEqual(DorfField.CHECKBOX);
        expect(def.mapping).toBeUndefined();
    });
});
