import { DorfChooseDefinition } from '../src/fields/base/dorf-choose.definition';
import { DorfRadioDefinition } from '../src/fields/dorf-radio.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';

describe('DorfChooseDefinition', () => {
    it('should have default values for options', () => {
        // GIVEN + WHEN
        let def1: DorfChooseDefinition<string> = new DorfRadioDefinition<string>();
        let def2: DorfChooseDefinition<number> = new DorfSelectDefinition<number>();

        // THEN
        expect(def1.optionsToSelect).toEqual(def2.optionsToSelect);
    });
});
