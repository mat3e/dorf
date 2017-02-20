import { DorfField } from '../src/fields/base/dorf-field';
import { DorfInputDefinition } from '../src/fields/dorf-input.definition';
import { DorfInputMetadata } from '../src/fields/dorf-input.metadata';

describe('DorfInputMetadata', () => {
    it('should get values for type and tag properties from the definition', () => {
        // GIVEN
        let inputDef = new DorfInputDefinition<Date>({ type: 'date' });

        // WHEN
        let inputMeta = new DorfInputMetadata<Date>(inputDef);

        // THEN
        expect(inputMeta.tag).toEqual(DorfField.INPUT);
        expect(inputDef.type).toEqual('date');
    });
});
