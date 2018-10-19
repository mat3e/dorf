import { RADIO } from '../src/fields/base/constants';
import { DorfRadioDefinition } from '../src/fields/dorf-radio.definition';

describe('DorfRadioDefinition', () => {

    it('should have value for "tag"', () => {
        // GIVEN + WHEN
        let radioDef = new DorfRadioDefinition();

        // THEN
        expect(radioDef.tag).toEqual(RADIO);
    });
});
