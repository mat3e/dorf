import { DorfField } from '../src/fields/base/dorf-field';
import { DorfNestedDefinition } from './../src/fields/base/dorf-nested.definition';

describe('DorfSelectDefinition', () => {
    it('should have values for "columnsNumber" and "tag" properties', () => {
        // GIVEN + WHEN
        let def = new DorfNestedDefinition();

        // THEN
        expect(def.tag).toEqual(DorfField.NESTED);
        expect(def.columnsNumber).toEqual(2);
    });
});
