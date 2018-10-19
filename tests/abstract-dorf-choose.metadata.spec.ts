import { IDorfChooseDefinition, OptionType } from '../src/fields/base/abstract-dorf-choose.definition';
import { DorfChooseMetadata } from '../src/fields/base/abstract-dorf-choose.metadata';
import { DorfRadioDefinition } from '../src/fields/dorf-radio.definition';
import { DorfRadioMetadata } from '../src/fields/dorf-radio.metadata';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';

describe('DorfChooseMetadata', () => {
    it('should get values for options from the definition', () => {
        // GIVEN
        let opts1: OptionType<string>[] = [{ key: '1', value: '1' }, { key: '2', value: '2' }];
        let opts2: OptionType<number>[] = [{ key: 1, value: '1' }, { key: 2, value: '2' }];
        let def1 = new DorfRadioDefinition<string>({ optionsToSelect: opts1 });
        let def2 = new DorfSelectDefinition<number>({ optionsToSelect: opts2 });

        // WHEN
        let meta1: DorfChooseMetadata<string, IDorfChooseDefinition<string>> = new DorfRadioMetadata<string>(def1);
        let meta2: DorfChooseMetadata<number, IDorfChooseDefinition<number>> = new DorfSelectMetadata<number>(def2);

        // THEN
        expect(meta1.optionsToSelect).toEqual(opts1);
        expect(meta2.optionsToSelect).toEqual(opts2);
    });
});
