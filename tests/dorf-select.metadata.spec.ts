import { DorfField } from '../src/fields/base/dorf-field';
import { OptionType } from '../src/fields/base/dorf-choose.definition';
import { DorfSelectDefinition } from './../src/fields/dorf-select.definition';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';

describe('DorfSelectMetadata', () => {
    it('should get values for multiple, select and tag properties from the definition', () => {
        // GIVEN
        let opts: OptionType<number>[] = [{ key: 1, value: '1' }, { key: 2, value: '2' }];
        let selectDef = new DorfSelectDefinition<number>({ multiple: true, optionsToSelect: opts });

        // WHEN
        let selectMeta = new DorfSelectMetadata<number>(selectDef);

        // THEN
        expect(selectMeta.tag).toEqual(DorfField.SELECT);
        expect(selectMeta.multiple).toBeTruthy();
        expect(selectMeta.optionsToSelect).toEqual(opts);
    });
});
