import { DorfField } from '../src/fields/base/dorf-field';
import { OptionType } from '../src/fields/base/dorf-choose.definition';
import { DorfRadioDefinition } from '../src/fields/dorf-radio.definition';
import { DorfRadioMetadata } from '../src/fields/dorf-radio.metadata';

describe('DorfRadioMetadata', () => {
    it('should get values for options and tag properties from the definition', () => {
        // GIVEN
        let opts: OptionType<number>[] = [{ key: 1, value: '1' }, { key: 2, value: '2' }];
        let radioDef = new DorfRadioDefinition<number>({ optionsToSelect: opts });

        // WHEN
        let radioMeta = new DorfRadioMetadata<number>(radioDef);

        // THEN
        expect(radioMeta.tag).toEqual(DorfField.RADIO);
        expect(radioMeta.optionsToSelect).toEqual(opts);
    });
});
