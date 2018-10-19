import { SELECT } from '../src/fields/base/constants';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';

describe('DorfSelectDefinition', () => {
    it('should have values for "multiple" and "tag" properties', () => {
        // GIVEN + WHEN
        let selectDef = new DorfSelectDefinition();

        // THEN
        expect(selectDef.tag).toEqual(SELECT);
        expect(selectDef.multiple).toBeFalsy();
    });
});
