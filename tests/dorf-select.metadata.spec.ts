import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';

describe('DorfSelectMetadata', () => {
    it('should get value for "multiple", from the definition', () => {
        // GIVEN
        let selectDef = new DorfSelectDefinition<number>({ multiple: true, optionsToSelect: [] });

        // WHEN
        let selectMeta = new DorfSelectMetadata<number>(selectDef);

        // THEN
        expect(selectMeta.multiple).toBeTruthy();
    });
});
