import { DorfField } from '../src/fields/base/dorf-field';
import { DorfRadioDefinition } from './../src/fields/dorf-radio.definition';

describe('DorfRadioDefinition', () => {

    it('should have value for "tag"', () => {
        // GIVEN + WHEN
        let radioDef = new DorfRadioDefinition();

        // THEN
        expect(radioDef.tag).toEqual(DorfField.RADIO);
    });
});
