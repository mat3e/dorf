import { DorfField } from '../src/fields/base/dorf-field';
import { DorfRadioDefinition } from './../src/fields/dorf-radio.definition';

describe('DorfRadioDefinition', () => {
    it('throws an error when no optionsToSelect nor asyncOptionsToSelect set', () => {
        // GIVEN
        let msg = `Expected 'asyncOptionsToSelect' to be Promise or Observable when no 'optionsToSelect' specified`;

        // WHEN
        let def = new DorfRadioDefinition<any>();
        let getterUsage = () => {
            return def.optionsToSelect;
        }

        // THEN
        expect(getterUsage).toThrowError(msg);
    });

    it('should have default values for tag', () => {
        // GIVEN + WHEN
        let radioDef = new DorfRadioDefinition({ optionsToSelect: [] });

        // THEN
        expect(radioDef.tag).toEqual(DorfField.RADIO);
    });
});
