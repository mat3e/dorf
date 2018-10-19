import { NESTED } from '../src/fields/base/constants';
import { DorfNestedDefinition } from '../src/fields/base/dorf-nested.definition';

describe('DorfSelectDefinition', () => {
    it('should have values for "columnsNumber" and "tag" properties', () => {
        // GIVEN + WHEN
        let def = new DorfNestedDefinition();

        // THEN
        expect(def.tag).toEqual(NESTED);
        expect(def.columnsNumber).toEqual(2);
    });
});
