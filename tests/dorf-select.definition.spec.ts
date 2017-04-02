import { DorfField } from '../src/fields/base/dorf-field';
import { DorfSelectDefinition } from './../src/fields/dorf-select.definition';

describe('DorfSelectDefinition', () => {
    it('throws an error when no optionsToSelect nor asyncOptionsToSelect set', () => {
        // GIVEN
        let msg = `Expected 'asyncOptionsToSelect' to be Promise or Observable when no 'optionsToSelect' specified`;

        // WHEN
        let def = new DorfSelectDefinition<any>();
        let getterUsage = () => {
            return def.optionsToSelect;
        }

        // THEN
        expect(getterUsage).toThrowError(msg);
    });

    it('should have default values for multiple and tag properties', () => {
        // GIVEN + WHEN
        let selectDef = new DorfSelectDefinition({ optionsToSelect: [] });

        // THEN
        expect(selectDef.tag).toEqual(DorfField.SELECT);
        expect(selectDef.multiple).toBeFalsy();
    });
});
